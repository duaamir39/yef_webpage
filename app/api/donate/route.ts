import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, amount, frequency } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("donations"); 
    const donations = db.collection("donations");

    await donations.insertOne({
      email,
      amount,
      frequency,
      createdAt: new Date(),
    });

    // 🔹 Send Thank You Email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Youth Evolution Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Your Donation ❤️",
      html: `
        <h2>Thank You!</h2>
        <p>We truly appreciate your <strong>${frequency}</strong> donation of 
        <strong>Rs. ${amount.toLocaleString("en-PK")}</strong>.</p>
        <p>Your support fuels youth empowerment and education programs.</p>
        <br/>
        <p>- Youth Evolution Foundation Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Donation API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
