'use server';

import nodemailer from 'nodemailer';
import { EmailProps } from './dataTypes';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_APP_SENDER_USERNAME, // Your Gmail address
    pass: process.env.GOOGLE_APP_SENDER_PASSWORD, // Your Gmail app password or password
  },
});

export async function sendEmail({
  name,
  email,
  message,
}: EmailProps): Promise<{ error: Error | null; message: string | null }> {
  return new Promise((resolve, reject) => {
    // Set up email data
    const mailOptions = {
      from: process.env.GOOGLE_APP_SENDER_USERNAME, // sender address
      to: process.env.GOOGLE_APP_RECEIVER_USERNAME, // list of receivers (your email)
      subject: `Hello from ${name} at ${email}`, // Subject line
      text: message, // plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject({ error, message: null });
      } else {
        resolve({ error: null, message: info.response });
      }
    });
  });
}
