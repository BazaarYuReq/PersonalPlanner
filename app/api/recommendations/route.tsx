import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in your .env
});

export async function POST(req: Request) {
  try {
    const { mood, name } = await req.json();

    const prompt = `The user is feeling "${mood}" today. Suggest three personalized productivity or wellness actions for them, in a friendly and supportive tone.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful productivity assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    const suggestions = completion.choices[0].message?.content;

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
