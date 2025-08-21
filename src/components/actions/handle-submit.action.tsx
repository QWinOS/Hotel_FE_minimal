"use server";

import { z } from "zod";
// import { formSchema } from "../WhatsAppForm"; // Import formSchema
import brevo from "@getbrevo/brevo";
import { toast } from "sonner";

export async function handleSubmitAction(
  name: string,
  email: string,
  phone: string,
  members: string,
  roomType: string,
  message: string,
  selectedDate: { from: string; to: string }
) {
  try {
    console.log("ANI");
    console.log(name, email, phone, members, roomType, message, selectedDate);
    // Ensure BREVO_API_KEY is set in your .env file
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const sender_Email = process.env.NEXT_PUBLIC_EMAIL;
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not set in environment variables.");
      throw new Error("Brevo API key is not configured.");
    }
    if (!sender_Email) {
      console.error("NEXT_PUBLIC_EMAIL is not set in environment variables.");
      throw new Error("Sender email is not configured.");
    }

    let apiInstance = new brevo.TransactionalEmailsApi();
    // Use type assertion to bypass TypeScript's protected property check
    (apiInstance as any).authentications["apiKey"].apiKey = BREVO_API_KEY;

    let dateString = "";
    if (selectedDate.from && selectedDate.to) {
      dateString = `<b>From: </b>${selectedDate.from} <b>to:</b> ${selectedDate.to}`;
    } else if (selectedDate.to) {
      dateString = `<b>Date:</b> ${new Date(
        selectedDate.to
      ).toLocaleDateString()}`;
    } else if (selectedDate.from) {
      dateString = `<b>Date:</b> ${new Date(
        selectedDate.from
      ).toLocaleDateString()}`;
    }

    const htmlContent = `
      <html>
        <body>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Room Type:</b> ${roomType}</p>
          <p><b>Number of Members:</b> ${members}</p>
          <p><b>Message:</b> ${message}</p>
          <p>${dateString}</p>
        </body>
      </html>
    `;

    let sendSmtpEmail = new brevo.SendSmtpEmail();

    // Email to the hotel management
    sendSmtpEmail.sender = {
      email: sender_Email, // Hotel's official email
      name: "Hotel Sweet Home International",
    };
    sendSmtpEmail.to = [
      {
        email: sender_Email, // The recipient of the inquiry
        name: "Hotel Sweet Home International",
      },
    ];
    sendSmtpEmail.replyTo = {
      email: email, // User's email for reply
      name: name,
    };
    sendSmtpEmail.subject = `New Inquiry from ${name}`;
    sendSmtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Inquiry email sent successfully!");

    // Send a thank you email to the user
    const thankYouEmail = new brevo.SendSmtpEmail();
    thankYouEmail.sender = {
      email: sender_Email, // Your hotel's sender email
      name: "Hotel Sweet Home International",
    };
    thankYouEmail.to = [
      {
        email: email, // Send to the user's email
        name: name,
      },
    ];
    thankYouEmail.subject = "Thank you for your inquiry! 📬";
    thankYouEmail.htmlContent = `
      <html>
        <body>
          <p>Dear ${name},</p>
          <p>Thank you for contacting us. We appreciate you taking the time to reach out.</p>
          <p>We'll review your message and get back to you as soon as possible.</p>
          <p>Here's a summary of your inquiry:</p>
          ${htmlContent}
          <p>Best regards,</p>
          <p>Hotel Sweet Home International Team</p>
        </body>
      </html>
    `;

    await apiInstance.sendTransacEmail(thankYouEmail);
    toast.success(
      "Thank you email sent successfully! We will get back to you soon."
    );
  } catch (error) {
    toast.error("Failed to send inquiry. Please try via WhatsApp.");
    console.error("Error in handleSubmitAction: ", error);
    throw error; // Re-throw the error so the client-side can catch it
  }
}
