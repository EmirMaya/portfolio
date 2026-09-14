import { validateContactPayload } from "./validation.mjs";

const MAX_BODY_BYTES = 24 * 1024;
const PUBLIC_ERROR = "Unable to send this message. Please try again later.";
const json = (body, status, headers = {}) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store", ...headers },
});

// Basic quota per running instance. Production needs a shared limiter or hosting WAF.
export function createSendLimiter({ limit = 5, windowMs = 60000, now = Date.now } = {}) {
  let count = 0;
  let resetAt = 0;
  return () => {
    const current = now();
    if (current >= resetAt) {
      count = 0;
      resetAt = current + windowMs;
    }
    if (count >= limit) return Math.max(1, Math.ceil((resetAt - current) / 1000));
    count += 1;
    return 0;
  };
}

async function readBody(req) {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("INVALID_BODY");
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export function createContactHandler({ sendEmail, takeSlot = createSendLimiter(), log = () => {} }) {
  return async (req) => {
    const origin = req.headers.get("origin");
    if (req.headers.get("sec-fetch-site") === "cross-site" ||
      (origin && origin !== new URL(req.url).origin)) {
      return json({ error: "Request not allowed." }, 403);
    }
    if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return json({ error: "Expected a JSON request." }, 415);
    }

    let body;
    try {
      body = await readBody(req);
    } catch (error) {
      const tooLarge = error.message === "BODY_TOO_LARGE";
      return json({ error: tooLarge ? "Request body is too large." : "Invalid request body." }, tooLarge ? 413 : 400);
    }
    const { payload, error } = validateContactPayload(body);
    if (error) return json({ error }, 400);

    const retryAfter = takeSlot();
    if (retryAfter) {
      return json({ error: "Too many messages. Please try again later." }, 429, { "Retry-After": String(retryAfter) });
    }
    try {
      const result = await sendEmail(payload);
      if (!result.ok) {
        // Log only fixed codes and numeric statuses, never payloads or raw errors.
        log({ code: result.code, ...(Number.isInteger(result.status) && { status: result.status }) });
        return json({ error: PUBLIC_ERROR }, 502);
      }
      return json({ message: "Message accepted for delivery." }, 200);
    } catch {
      log({ code: "CONTACT_EMAIL_CONFIG_OR_SERVICE_FAILURE" });
      return json({ error: PUBLIC_ERROR }, 503);
    }
  };
}
