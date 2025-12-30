"use server";

import nodemailer from "nodemailer";
import { EmailProps } from "./dataTypes";

// Lazy transporter creation - only created when needed and after env validation
function getTransporter() {
  // Validate environment variables before creating transporter
  if (!process.env.GOOGLE_APP_SENDER_USERNAME) {
    throw new Error("GOOGLE_APP_SENDER_USERNAME is not configured");
  }
  if (!process.env.GOOGLE_APP_SENDER_PASSWORD) {
    throw new Error("GOOGLE_APP_SENDER_PASSWORD is not configured");
  }
  if (!process.env.GOOGLE_APP_RECEIVER_USERNAME) {
    throw new Error("GOOGLE_APP_RECEIVER_USERNAME is not configured");
  }

  // Create transporter object using Gmail SMTP transport
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_SENDER_USERNAME,
      pass: process.env.GOOGLE_APP_SENDER_PASSWORD,
    },
  });
}

export async function sendEmail({
  name,
  email,
  message,
}: EmailProps): Promise<void> {
  const transporter = getTransporter();

  // Set up email data
  const mailOptions = {
    from: process.env.GOOGLE_APP_SENDER_USERNAME!,
    to: process.env.GOOGLE_APP_RECEIVER_USERNAME!,
    subject: `Portfolio Contact: ${name} (${email})`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email, // Allow replying directly to the sender
  };

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    // Log detailed error information for debugging
    console.error("Failed to send email:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      // Check for common Gmail authentication errors
      if (error.message.includes("Invalid login")) {
        throw new Error(
          "Invalid Gmail credentials. Please check your GOOGLE_APP_SENDER_USERNAME and GOOGLE_APP_SENDER_PASSWORD. Make sure you're using an App Password, not your regular Gmail password.",
        );
      }
      if (error.message.includes("Less secure app")) {
        throw new Error(
          "Gmail security settings are blocking the connection. Please use an App Password instead of your regular password.",
        );
      }
      if (
        error.message.includes("ECONNECTION") ||
        error.message.includes("ETIMEDOUT")
      ) {
        throw new Error(
          "Connection to Gmail servers failed. Please check your internet connection and try again.",
        );
      }
      // Re-throw with original message for other errors
      throw error;
    }
    throw new Error("Unknown error occurred while sending email");
  }
}
