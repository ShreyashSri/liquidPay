import { runChat } from "@/server/chatbot/chatbotController";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, chatHistory } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Call the runChat function from your chatbotController
    const response = await runChat(message, chatHistory || []);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chatbot API route:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
