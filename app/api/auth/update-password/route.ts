import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await db.collection("users").findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: new Date() }, 
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { passwordResetToken: "", passwordResetExpires: "" }, 
      }
    );

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}