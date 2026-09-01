import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jsonResponse = (body, status) => NextResponse.json(body, { status });

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const validateContactPayload = ({ email, subject, message, website }) => {
  const sanitizedPayload = {
    email: normalizeString(email).toLowerCase(),
    subject: normalizeString(subject),
    message: normalizeString(message),
    website: normalizeString(website),
  };

  if (sanitizedPayload.website) {
    return { error: "Unable to send this message.", payload: sanitizedPayload };
  }

  if (
    !sanitizedPayload.email ||
    sanitizedPayload.email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(sanitizedPayload.email)
  ) {
    return { error: "Please enter a valid email.", payload: sanitizedPayload };
  }

  if (
    !sanitizedPayload.subject ||
    sanitizedPayload.subject.length > MAX_SUBJECT_LENGTH
  ) {
    return {
      error: `Subject must be between 1 and ${MAX_SUBJECT_LENGTH} characters.`,
      payload: sanitizedPayload,
    };
  }

  if (
    !sanitizedPayload.message ||
    sanitizedPayload.message.length > MAX_MESSAGE_LENGTH
  ) {
    return {
      error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.`,
      payload: sanitizedPayload,
    };
  }

  return { payload: sanitizedPayload };
};

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const { error, payload } = validateContactPayload(body);

  if (error) {
    return jsonResponse({ error }, 400);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return jsonResponse({ error: "Email service is not configured." }, 500);
  }

  try {
    const resend = new Resend(resendApiKey);
    const { data, error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail],
      reply_to: payload.email,
      subject: payload.subject,
      text: [
        `New message submitted from ${payload.email}:`,
        "",
        payload.message,
      ].join("\n"),
    });

    if (resendError) {
      return jsonResponse({ error: "Unable to send this message." }, 502);
    }

    return jsonResponse({ id: data?.id, message: "Email sent successfully." }, 200);
  } catch (error) {
    return jsonResponse({ error: "Unable to send this message." }, 500);
  }
}
