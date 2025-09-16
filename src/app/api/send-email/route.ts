import { NextResponse } from "next/server";
import axios from "axios";

interface EmailData {
  sender: {
    email: string;
    name: string;
  };
  to: Array<{
    email: string;
    name: string;
  }>;
  replyTo?: {
    email: string;
    name: string;
  };
  subject: string;
  htmlContent: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, members, roomType, message, selectedDate } =
      await request.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const senderEmail = process.env.NEXT_PUBLIC_EMAIL;

    if (!BREVO_API_KEY || !senderEmail) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const dateString =
      selectedDate.from && selectedDate.to
        ? `<b>From: </b>${selectedDate.from} <b>to:</b> ${selectedDate.to}`
        : selectedDate.to
        ? `<b>Date:</b> ${new Date(selectedDate.to).toLocaleDateString()}`
        : selectedDate.from
        ? `<b>Date:</b> ${new Date(selectedDate.from).toLocaleDateString()}`
        : "";

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
      </html>`;

    // Send inquiry email
    const inquiryEmail: EmailData = {
      sender: {
        email: senderEmail,
        name: "Hotel Sweet Home International",
      },
      to: [
        {
          email: senderEmail,
          name: "Hotel Sweet Home International",
        },
      ],
      replyTo: {
        email,
        name,
      },
      subject: `New Inquiry from ${name}`,
      htmlContent,
    };

    await axios.post("https://api.brevo.com/v3/smtp/email", inquiryEmail, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });

    // Send thank you email
    const thankYouEmail: EmailData = {
      sender: {
        email: senderEmail,
        name: "Hotel Sweet Home International",
      },
      to: [
        {
          email,
          name,
        },
      ],
      subject: "Thank you for your inquiry! 📬",
      htmlContent: `
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
        </html>`,
    };

    await axios.post("https://api.brevo.com/v3/smtp/email", thankYouEmail, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in email API route:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
