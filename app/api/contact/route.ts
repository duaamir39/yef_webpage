import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    console.log("📩 Received contact form:", { name, email, subject, message });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // 16-char App Password
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // send FROM NGO Gmail
      replyTo: email,               // replies will go to user’s email
      to: process.env.EMAIL_USER,   // NGO inbox
      subject: subject || "New Contact Form Message",
      text: message,
      html: `
        <p><b>From:</b> ${name} (${email})</p>
        <p><b>Subject:</b> ${subject}</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
