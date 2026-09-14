import "server-only";
import { getEmailConfig } from "../../../server/contact/config.mjs";
import { createContactHandler } from "../../../server/contact/handler.mjs";
import { createResendSender } from "../../../server/contact/resend.mjs";

export const runtime = "nodejs";

// Composition stays server-only. Validation and HTTP handling depend on a sender function.
export const POST = createContactHandler({
  sendEmail: (payload) => createResendSender(getEmailConfig(process.env))(payload),
  log: (event) => console.error("[Contact email]", event),
});
