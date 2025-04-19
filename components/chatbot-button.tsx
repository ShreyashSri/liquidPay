"use client";
import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { Send, X, MessageSquare } from "lucide-react";

// Define types for our messages
interface Message {
  text: string;
  isBot: boolean;
  role?: "user" | "model"; // For API communication
}

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm FinSavvy AI. How can I assist with your financial questions today?",
      isBot: true,
      role: "model",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Format chat history for the API
      const chatHistory = messages.map((msg) => ({
        role: msg.isBot ? "model" : "user",
        text: msg.text,
      }));

      // Add the new user message
      chatHistory.push({
        role: "user",
        text: input,
      });

      const response = await fetch("/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          chatHistory: chatHistory,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          isBot: true,
          role: "model",
        },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting right now. Please try again later.",
          isBot: true,
          role: "model",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return !isOpen ? (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full shadow-lg flex items-center justify-center text-black z-50 hover:scale-110 transition-transform duration-300"
      aria-label="Open chat support"
    >
      <MessageSquare size={24} />
    </button>
  ) : (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-700">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-black px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center mr-3">
            <MessageSquare size={18} />
          </div>
          <div>
            <h3 className="font-semibold">FinSavvy AI</h3>
            <p className="text-xs text-gray-800">powered by liquidpay</p>
          </div>
        </div>
        <button
          onClick={toggleChat}
          className="text-black hover:bg-black/10 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.isBot ? "justify-start" : "justify-end"
            }`}
          >
            {msg.isBot && (
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center mr-2 flex-shrink-0">
                FS
              </div>
            )}
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                msg.isBot
                  ? "bg-gray-700 text-white shadow-sm border border-gray-600 rounded-tl-none"
                  : "bg-yellow-600 text-black rounded-tr-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center mr-2 flex-shrink-0">
              FS
            </div>
            <div className="px-4 py-3 rounded-2xl bg-gray-700 text-white shadow-sm border border-gray-600 rounded-tl-none">
              <div className="flex space-x-1">
                <div className="typing-dot"></div>
                <div className="typing-dot animation-delay-200"></div>
                <div className="typing-dot animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your finances..."
            className="flex-1 bg-transparent outline-none text-white"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={isTyping || !input.trim()}
            className={`ml-2 p-2 rounded-full ${
              !input.trim() || isTyping
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-500 text-black"
            }`}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-center mt-2 text-xs text-gray-500">
          FinSavvy AI powered by liquidpay
        </div>
      </div>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #ffd700;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.5s infinite ease-in-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatbotButton;
