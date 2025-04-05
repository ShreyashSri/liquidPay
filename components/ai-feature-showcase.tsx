"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Bell, Zap, TrendingUp, ShoppingBag, CreditCard, ArrowRight, CheckCircle, X } from "lucide-react"

const nudges = [
  {
    id: 1,
    title: "High Restaurant Spending",
    message: "You've spent ₹4,500 on restaurants this month, which is 30% higher than your usual. Want to set a limit?",
    time: "2 hours ago",
    type: "warning",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Subscription Renewal",
    message: "Your Netflix subscription (₹499) will renew tomorrow. You haven't watched in 45 days. Cancel?",
    time: "1 day ago",
    type: "info",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Savings Milestone",
    message: "Congrats! You've saved ₹10,000 this month. That's a new record! Keep it up!",
    time: "3 days ago",
    type: "success",
    icon: <TrendingUp className="h-5 w-5" />,
  },
]

const chatMessages = [
  { id: 1, sender: "user", message: "How much did I spend on food last month?" },
  {
    id: 2,
    sender: "ai",
    message:
      "You spent ₹12,450 on food last month. This is about 28% of your total spending and 15% higher than your 3-month average.",
  },
  { id: 3, sender: "user", message: "How can I reduce this?" },
  {
    id: 4,
    sender: "ai",
    message:
      "Based on your habits, I see you order food delivery 4-5 times per week. If you reduced this to 2 times per week, you could save approximately ₹4,000 per month. Would you like me to suggest some affordable meal prep ideas?",
  },
]

export default function AiFeatureShowcase() {
  const [activeTab, setActiveTab] = useState("nudges")

  return (
    <section className="w-full py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,192,192,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">AI Features</Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Smart Financial{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Assistant
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience how our AI helps you make better financial decisions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Tabs defaultValue="nudges" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-gray-800 p-1 mb-6">
                <TabsTrigger
                  value="nudges"
                  className={`${activeTab === "nudges" ? "bg-gray-700 text-white" : "text-gray-400"} px-6 py-2`}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Smart Nudges
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className={`${activeTab === "chat" ? "bg-gray-700 text-white" : "text-gray-400"} px-6 py-2`}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nudges" className="mt-0">
                <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {nudges.map((nudge) => (
                        <div
                          key={nudge.id}
                          className={`p-4 rounded-lg border ${
                            nudge.type === "warning"
                              ? "bg-yellow-500/10 border-yellow-500/30"
                              : nudge.type === "success"
                                ? "bg-green-500/10 border-green-500/30"
                                : "bg-blue-500/10 border-blue-500/30"
                          }`}
                        >
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div
                                className={`p-2 rounded-full ${
                                  nudge.type === "warning"
                                    ? "bg-yellow-500/20"
                                    : nudge.type === "success"
                                      ? "bg-green-500/20"
                                      : "bg-blue-500/20"
                                }`}
                              >
                                {nudge.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white mb-1">{nudge.title}</h4>
                              <p className="text-xs text-gray-400 mb-3">{nudge.message}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">{nudge.time}</span>
                                <div className="flex space-x-2">
                                  {nudge.type === "warning" || nudge.type === "info" ? (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 px-2 text-xs border-gray-600 hover:bg-gray-700"
                                      >
                                        <X className="h-3 w-3 mr-1" /> Dismiss
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="h-7 px-2 text-xs bg-yellow-600 hover:bg-yellow-500 text-white"
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" /> Take Action
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      size="sm"
                                      className="h-7 px-2 text-xs bg-green-600 hover:bg-green-500 text-white"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" /> Acknowledge
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="mt-0">
                <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-yellow-600 text-white rounded-tr-none"
                                : "bg-gray-700 text-gray-200 rounded-tl-none"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex">
                      <input
                        type="text"
                        placeholder="Ask about your finances..."
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                      />
                      <Button className="rounded-l-none bg-yellow-600 hover:bg-yellow-500">
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-4 text-white">AI-Powered Financial Guidance</h3>
              <p className="text-gray-400 mb-6">
                Our intelligent assistant analyzes your spending patterns and provides personalized recommendations to
                help you save money and build better financial habits.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-yellow-500/20 mr-4 mt-1">
                    <Bell className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Real-time Nudges</h4>
                    <p className="text-gray-400 text-sm">
                      Receive timely notifications that help you make better financial decisions in the moment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-yellow-500/20 mr-4 mt-1">
                    <MessageSquare className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Conversational AI</h4>
                    <p className="text-gray-400 text-sm">
                      Chat with our AI assistant to get insights about your spending and personalized advice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-yellow-500/20 mr-4 mt-1">
                    <TrendingUp className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Behavioral Analysis</h4>
                    <p className="text-gray-400 text-sm">
                      Get insights into your spending habits and learn how to improve your financial behavior.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

