"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";
import { basicDetails } from "../data/basic";

const resend = new Resend(process.env.RESEND_API_KEY);

// Schema for input validation
const ContactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  senderEmail: z.string()
    .email("Invalid email address")
    .max(500, "Email must be less than 500 characters")
    .trim(),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
  honeypot: z.string().optional(),
});

// Simple in-memory rate limit map (cleared on server restart)
// For production, consider using a persistent store like Upstash Redis
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

export const sendEmail = async (formData: FormData) => {
  // 1. Get Client IP for Rate Limiting
  const headerList = await headers();
  const clientIp = headerList.get("x-forwarded-for") || "unknown";

  // 2. Apply Rate Limiting
  const now = Date.now();
  const rateLimit = rateLimitMap.get(clientIp);

  if (rateLimit) {
    if (now - rateLimit.lastReset > RATE_LIMIT_WINDOW) {
      rateLimit.count = 1;
      rateLimit.lastReset = now;
    } else {
      if (rateLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return {
          error: "Too many requests. Please try again in an hour.",
        };
      }
      rateLimit.count++;
    }
  } else {
    rateLimitMap.set(clientIp, { count: 1, lastReset: now });
  }

  // 3. Extract and Validate Form Data
  const rawData = {
    name: formData.get("name"),
    senderEmail: formData.get("senderEmail"),
    message: formData.get("message"),
    honeypot: formData.get("_gotcha"),
  };

  const validatedFields = ContactFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  const { name, senderEmail, message, honeypot } = validatedFields.data;

  // 4. Honeypot check
  if (honeypot) {
    console.log("Honeypot triggered from IP:", clientIp);
    return { data: { success: true } }; // Silent reject
  }

  // 5. Send Email
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: `${basicDetails.email}`,
      subject: `[Portfolio] New Message from ${name}`,
      replyTo: senderEmail,
      text: `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        error: error.message || "Failed to send email.",
      };
    }

    return { data };
  } catch (err: unknown) {
    console.error("Unexpected Error:", err);
    return {
      error: "Something went wrong. Please try again later.",
    };
  }
};
