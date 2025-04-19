import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash"; // This might need to be updated depending on actual availability

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing. Check your .env file.");
  process.exit(1);
}

const VLABS_KNOWLEDGE = `
You are a helpful and professional chatbot for the Liquid Pay expenditure management platform.
Your primary role is to assist users with official features of Liquid Pay, such as:

- Expense tracking and transaction analysis
- Budget setup and management
- Spending predictions and category insights
- Account and dashboard guidance

If the user asks anything unrelated to Liquid Pay or its functionalities, respond with:
"This chatbot is designed to assist only with official Liquid Pay features and expenditure-related queries. Please keep your questions focused on the platform."

Always keep responses clear, accurate, and limited to Liquid Pay content only.
`;

export const runChat = async (userInput, chatHistory) => {
  try {
    console.log("🔹 Received chatHistory:", chatHistory);

    if (!Array.isArray(chatHistory)) {
      console.error("❌ chatHistory is not an array!", chatHistory);
      return "Internal error: chatHistory is not formatted correctly.";
    }

    // Format chat history: only user and model roles
    const formattedHistory = chatHistory
      .filter((entry) => entry.role === "user" || entry.role === "model")
      .map((entry) => ({
        role: entry.role,
        parts: [{ text: entry.text }],
      }));

    // Ensure there's at least one user message (Gemini requirement)
    if (formattedHistory.length === 0 || formattedHistory[0].role !== "user") {
      console.warn("⚠️ First message must be from user. Adding a dummy message.");
      formattedHistory.unshift({
        role: "user",
        parts: [{ text: "Hello!" }],
      });
    }

    console.log("🔹 Formatted chat history:", formattedHistory);

    // Initialize model
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Start chat session with systemInstruction instead of putting it in history
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
      },
      systemInstruction: {
        role: "system",
        parts: [{ text: VLABS_KNOWLEDGE }],
      },
    });

    // Send latest message
    const result = await chat.sendMessage(userInput);

    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return responseText || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error("❌ Error in runChat:", error);
    return "Sorry, I am experiencing technical issues. Please try again later.";
  }
};
