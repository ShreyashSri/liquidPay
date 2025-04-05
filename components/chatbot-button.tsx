"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      content: "Hi there! I'm FinSavvy AI, your personal financial assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { id: messages.length + 1, role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on your spending patterns, I recommend setting aside ₹5,000 for your emergency fund this month.",
        "I noticed you've been spending more on dining out. Would you like me to suggest some budget-friendly alternatives?",
        "Great question! Your current savings rate is 18%, which is above the recommended 15% for your age group.",
        "I've analyzed your accounts and found 3 subscriptions you haven't used in the last 2 months. Would you like to review them?",
        "Your investment portfolio is well-balanced, but you might want to consider increasing your exposure to index funds.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage = { id: messages.length + 2, role: "bot", content: randomResponse }
      setMessages((prevMessages) => [...prevMessages, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black z-50 flex items-center justify-center"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-2xl bg-gray-900 border-gray-800 z-50 overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
          <CardHeader className="bg-gray-800 pb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2">
                <Bot className="h-4 w-4 text-yellow-500" />
              </div>
              <CardTitle className="text-white text-lg">FinSavvy Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3 max-h-96 overflow-y-auto bg-gray-900" style={{ scrollBehavior: "smooth" }}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-yellow-600 text-white rounded-tr-none"
                        : "bg-gray-800 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-lg bg-gray-800 text-gray-200 rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t border-gray-800 bg-gray-900">
            <form onSubmit={handleSend} className="flex w-full space-x-2">
              <Input
                placeholder="Ask about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-white focus-visible:ring-yellow-500"
              />
              <Button type="submit" size="icon" className="bg-yellow-600 hover:bg-yellow-500 text-black">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
          <div className="px-3 py-2 bg-gray-800 text-xs text-gray-400 flex items-center justify-center">
            <Sparkles className="h-3 w-3 mr-1 text-yellow-500" /> Powered by FinSavvy AI
          </div>
        </Card>
      )}
    </>
  )
}

