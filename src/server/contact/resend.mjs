// This adapter receives server configuration from the route; it never reads client data as config.
export function createResendSender({ apiKey, from, to }, fetchEmail = fetch) {
  return async ({ email, subject, message }) => {
    try {
      // Use the REST API to avoid the SDK's automatic logging of raw provider errors.
      const response = await fetchEmail("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
        redirect: "error",
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text: [`New portfolio message from ${email}:`, "", message].join("\n"),
        }),
      });
      if (!response.ok) {
        // Never read or log the provider's error body (it may contain private data).
        await response.body?.cancel();
        return { ok: false, code: "EMAIL_PROVIDER_REJECTED", status: response.status };
      }
      const data = await response.json();
      return typeof data?.id === "string" && data.id.length > 0
        ? { ok: true }
        : { ok: false, code: "EMAIL_PROVIDER_INVALID_RESPONSE" };
    } catch {
      return { ok: false, code: "EMAIL_PROVIDER_UNAVAILABLE" };
    }
  };
}
