import { isEmail } from "./validation.mjs";

export function getEmailConfig(env) {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.FROM_EMAIL?.trim();
  const to = env.TO_EMAIL?.trim();
  // Accept a bare address or Resend's "Display Name <address>" format.
  const sender = from?.match(/^(?:[^<>\r\n]+ <([^<>]+)>|([^<>]+))$/);
  const fromAddress = sender?.[1] || sender?.[2];

  if (!apiKey || !isEmail(fromAddress) || !isEmail(to)) {
    throw new Error("CONTACT_EMAIL_CONFIG_INVALID");
  }
  if (["gmail.com", "googlemail.com"].includes(fromAddress.split("@")[1].toLowerCase())) {
    throw new Error("CONTACT_SENDER_DOMAIN_NOT_OWNED");
  }
  return { apiKey, from, to };
}
