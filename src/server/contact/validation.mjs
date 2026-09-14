const EMAIL_PATTERN = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;
const hasControlCharacters = (value) =>
  [...value].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127);

export const isEmail = (value) =>
  typeof value === "string" && value.length <= 254 &&
  !hasControlCharacters(value) && EMAIL_PATTERN.test(value);

export function validateContactPayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Invalid request body." };
  }

  const { email, subject, message, website } = body;
  if (website !== undefined && (typeof website !== "string" || website.trim())) {
    return { error: "Unable to send this message." };
  }
  if (!isEmail(email)) return { error: "Please enter a valid email." };
  if (typeof subject !== "string" || !subject.trim() || subject.length > 120 || hasControlCharacters(subject)) {
    return { error: "Subject must be a single line between 1 and 120 characters." };
  }
  if (typeof message !== "string" || !message.trim() || message.length > 3000) {
    return { error: "Message must be between 1 and 3000 characters." };
  }

  // Allowlist only the form fields; clients cannot choose from/to/headers/html.
  return { payload: { email, subject: subject.trim(), message: message.trim() } };
}
