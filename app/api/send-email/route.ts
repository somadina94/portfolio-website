import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import ContactEmailTemplate from "@/components/general/contact-email-template";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message, subject, token } = await req.json();

  if (!name || !email || !message || !subject) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  if (!token) {
    return NextResponse.json(
      { error: "CAPTCHA not completed." },
      { status: 400 }
    );
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });

  const { success } = await res.json();

  if (!success) {
    return NextResponse.json(
      { error: "CAPTCHA not completed." },
      { status: 400 }
    );
  }

  const emailHtml = await render(
    ContactEmailTemplate({
      name,
      email,
      message,
      subject,
    })
  );

  // Configure Nodemailer with Zoho SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.zoho.com",
    port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Only use this in development
    },
  });

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
    to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
    subject: `Contact Form: ${subject}`,
    html: emailHtml,
    replyTo: email, // Allow direct reply to the sender
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        details:
          "Please check your SMTP configuration and environment variables",
      },
      { status: 500 }
    );
  }
}
