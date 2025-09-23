import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    const chatPrompt = `
      You are a friendly and informative chatbot for the Youth Evolution Foundation (YEF).
      Your purpose is to answer user queries about the organization, its mission, programs, and how to get involved.
      Keep your answers concise and relevant to the organization.
      
      Here are some facts about YEF to help you answer:
      - Mission: To empower youth through education, mentorship, and community service.
      - Programs: Education workshops, leadership training, and environmental initiatives.
      - How to get involved: Users can volunteer, donate, or become a member.
      
      User's query: ${message}
      `;

    const result = await model.generateContent(chatPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: "Failed to get a response from the chatbot." }, { status: 500 });
  }
}