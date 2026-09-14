import assert from "node:assert/strict";
import { test } from "node:test";
import { getEmailConfig } from "../src/server/contact/config.mjs";
import { createContactHandler, createSendLimiter } from "../src/server/contact/handler.mjs";
import { createResendSender } from "../src/server/contact/resend.mjs";

const payload = { email: "visitor@example.org", subject: "Hello", message: "My project", website: "" };
const config = { apiKey: "fake-test-key", from: "Portfolio <onboarding@resend.dev>", to: "owner@example.org" };
const request = (body = payload, headers = {}) => new Request("https://portfolio.example/api/send", {
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

test("configuration requires distinct server-owned sender and recipient settings", () => {
  const env = { RESEND_API_KEY: config.apiKey, FROM_EMAIL: config.from, TO_EMAIL: config.to };
  assert.deepEqual(getEmailConfig(env), config);
  for (const invalid of [
    { ...env, RESEND_API_KEY: "" },
    { ...env, TO_EMAIL: "" },
    { ...env, FROM_EMAIL: "owner@gmail.com" },
    { ...env, FROM_EMAIL: "Owner <owner@GMAIL.com>" },
    { ...env, TO_EMAIL: "one@example.org,two@example.org" },
  ]) assert.throws(() => getEmailConfig(invalid));
});

test("REST request fixes recipient/reply-to and never accepts arbitrary mail options", async () => {
  let sent;
  const sender = createResendSender(config, async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options.headers.Authorization, "Bearer fake-test-key");
    assert.equal(options.redirect, "error");
    assert.ok(options.signal instanceof AbortSignal);
    sent = JSON.parse(options.body);
    return Response.json({ id: "private-provider-id" });
  });
  const handler = createContactHandler({ sendEmail: sender });
  const response = await handler(request({ ...payload, to: "attacker@example.org", from: "attacker@example.org", html: "<script>bad</script>", headers: { Bcc: "attacker@example.org" } }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { message: "Message accepted for delivery." });
  assert.deepEqual(sent, {
    from: config.from, to: [config.to], reply_to: payload.email, subject: payload.subject,
    text: `New portfolio message from ${payload.email}:\n\n${payload.message}`,
  });
});

test("invalid JSON, types, honeypot, lengths and header injection never send email", async () => {
  let calls = 0;
  const handler = createContactHandler({ sendEmail: async () => { calls++; return { ok: true }; } });
  const invalidBodies = [null, [], 42, "{", {},
    { ...payload, website: "bot" }, { ...payload, website: {} },
    { ...payload, email: "one@example.org,two@example.org" },
    { ...payload, email: "user@example.org\r\nBcc: hidden@example.org" },
    { ...payload, email: "a".repeat(255) + "@example.org" },
    { ...payload, subject: "Hi\r\nBcc: hidden@example.org" },
    { ...payload, subject: "a".repeat(121) }, { ...payload, subject: {} },
    { ...payload, message: " " }, { ...payload, message: "a".repeat(3001) },
  ];
  for (const body of invalidBodies) assert.equal((await handler(request(body))).status, 400);
  assert.equal(calls, 0);
});

test("body size is bounded even without a Content-Length header", async () => {
  let called = false;
  const handler = createContactHandler({ sendEmail: async () => { called = true; } });
  assert.equal((await handler(request({ ...payload, extra: "x".repeat(25000) }))).status, 413);
  assert.equal(called, false);
});

test("cross-origin and non-JSON submissions are rejected before sending", async () => {
  const handler = createContactHandler({ sendEmail: async () => { throw new Error("must not send"); } });
  assert.equal((await handler(request(payload, { Origin: "https://attacker.example" }))).status, 403);
  assert.equal((await handler(request(payload, { "Sec-Fetch-Site": "cross-site" }))).status, 403);
  assert.equal((await handler(request(payload, { "Content-Type": "text/plain" }))).status, 415);
});

test("provider rejection and exceptions expose neither secrets nor provider details", async () => {
  for (const status of [401, 403, 429, 500]) {
    const logs = [];
    const handler = createContactHandler({
      sendEmail: createResendSender(config, async () => Response.json({ message: "private-provider-detail", key: config.apiKey }, { status })),
      log: (event) => logs.push(event),
    });
    const response = await handler(request());
    assert.equal(response.status, 502);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.deepEqual(logs, [{ code: "EMAIL_PROVIDER_REJECTED", status }]);
    assert.deepEqual(await response.json(), { error: "Unable to send this message. Please try again later." });
  }
  for (const sendEmail of [
    createResendSender(config, async () => { throw new Error("private network detail"); }),
    async () => { throw new Error("private configuration detail"); },
  ]) {
    const response = await createContactHandler({ sendEmail })(request());
    assert.ok([502, 503].includes(response.status));
    assert.deepEqual(await response.json(), { error: "Unable to send this message. Please try again later." });
  }
});

test("provider must confirm acceptance before reporting success", async () => {
  const sender = createResendSender(config, async () => Response.json({}));
  assert.equal((await createContactHandler({ sendEmail: sender })(request())).status, 502);
});

test("quota stops sends, includes Retry-After, and recovers after the window", async () => {
  let now = 0;
  let sends = 0;
  const handler = createContactHandler({
    takeSlot: createSendLimiter({ limit: 2, windowMs: 60000, now: () => now }),
    sendEmail: async () => { sends++; return { ok: true }; },
  });
  assert.equal((await handler(request())).status, 200);
  assert.equal((await handler(request())).status, 200);
  const blocked = await handler(request());
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("Retry-After"), "60");
  assert.equal(sends, 2);
  now = 60000;
  assert.equal((await handler(request())).status, 200);
});
