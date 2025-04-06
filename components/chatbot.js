"use client";
import { useState, useEffect, useRef } from "react";
import { FiSend, FiX, FiMessageCircle } from "react-icons/fi";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Virtual Labs! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatbot/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isBot: true }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting to the server. Please try again later.",
          isBot: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return !isOpen ? (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-sky-600 rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:scale-110 transition-transform duration-300"
      aria-label="Open chat support"
    >
      <FiMessageCircle size={24} />
    </button>
  ) : (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <FiMessageCircle size={18} />
          </div>
          <div>
            <h3 className="font-semibold">Virtual Labs Assistant</h3>
            <p className="text-xs text-blue-100">Ministry of Education</p>
          </div>
        </div>
        <button
          onClick={toggleChat}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.isBot ? "justify-start" : "justify-end"
            }`}
          >
            {msg.isBot && (
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                VL
              </div>
            )}
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                msg.isBot
                  ? "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                  : "bg-blue-600 text-white rounded-tr-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
              VL
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none">
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
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1 bg-transparent outline-none text-gray-700"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={isTyping || !input.trim()}
            className={`ml-2 text-white p-2 rounded-full ${
              !input.trim() || isTyping
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-label="Send message"
          >
            <FiSend size={16} />
          </button>
        </div>
        <div className="text-center mt-2 text-xs text-gray-500">
          Powered by Virtual Labs AI
        </div>
      </div>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #3b82f6;
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

export default Chatbot;
