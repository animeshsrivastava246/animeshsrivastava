"use server";

import { Resend } from "resend";

// Initialize Resend with the API key or a fallback during development.
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const name = formData.get("name");
  const message = formData.get("message");
  const honeypot = formData.get("_gotcha");

  // Honeypot spam protection
  if (honeypot) {
    // Silently reject
    return { data: { success: true } };
  }

  // Simple server-side validation
  if (!senderEmail || typeof senderEmail !== "string" || senderEmail.length > 500) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!name || typeof name !== "string" || name.length > 100) {
    return {
      error: "Invalid name",
    };
  }
  if (!message || typeof message !== "string" || message.length > 5000) {
    return {
      error: "Invalid message",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: `${process.env.EMAIL_TO}`, // Replace with your actual email if needed
      subject: `[Portfolio] New Message from ${name}`,
      replyTo: senderEmail as string,
      text: `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
    });
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong. Have you set up your Resend API key?",
    };
  }

  // Resend API returns an error property on the data object if something goes wrong
  if (data?.error) {
    return {
      error: data.error.message || "Failed to send email. Check your Resend API key.",
    }
  }

  return { data };
};
