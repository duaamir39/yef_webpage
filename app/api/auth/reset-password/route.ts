import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import nodemailer from "nodemailer"; 

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "If a user with that email exists, a password reset link has been sent." },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = Date.now() + 3600000; 

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          passwordResetToken,
          passwordResetExpires: new Date(passwordResetExpires),
        },
      }
    );

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${request.headers.get('origin')}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello,</p>
        <p>You recently requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#024da1;color:#ffffff;text-decoration:none;border-radius:5px;font-weight:bold;">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset link sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}