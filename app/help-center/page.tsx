"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  HelpCircle,
  FileText,
  MessageSquare,
  Book,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("guides");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <HelpCircle className="h-3.5 w-3.5 mr-1" /> Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            How can we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              help you?
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Find answers to your questions and learn how to get the most out of
            FinSavvy AI
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 bg-gray-800/50 border-gray-700 text-white focus-visible:ring-yellow-500 rounded-full"
            />
            <Button className="absolute right-1.5 top-1.5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black rounded-full">
              Search
            </Button>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Popular Topics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TopicCard
              icon={<FileText className="h-6 w-6 text-yellow-500" />}
              title="Getting Started"
              description="Learn the basics of FinSavvy AI and how to set up your account"
              articles={[
                "Creating your account",
                "Connecting your bank accounts",
                "Setting up your first savings goal",
              ]}
            />
            <TopicCard
              icon={<MessageSquare className="h-6 w-6 text-yellow-500" />}
              title="AI Features"
              description="Discover how our AI helps you improve your financial behavior"
              articles={[
                "Understanding behavior insights",
                "How real-time nudges work",
                "Personalized recommendations",
              ]}
            />
            <TopicCard
              icon={<Book className="h-6 w-6 text-yellow-500" />}
              title="Billing & Subscriptions"
              description="Information about plans, billing, and subscription management"
              articles={[
                "Subscription plans comparison",
                "Changing your plan",
                "Payment methods and billing",
              ]}
            />
          </div>
        </div>

        {/* Help Content Tabs */}
        <Tabs
          defaultValue="guides"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger
                value="guides"
                className={`${
                  activeTab === "guides"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Guides
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className={`${
                  activeTab === "faq"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className={`${
                  activeTab === "videos"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Guides Tab */}
          <TabsContent value="guides" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GuideCard
                title="Setting Up Your Account"
                description="Learn how to create your account and set up your profile"
                timeToRead="5 min read"
              />
              <GuideCard
                title="Connecting Bank Accounts"
                description="Step-by-step guide to securely connect your bank accounts"
                timeToRead="7 min read"
              />
              <GuideCard
                title="Creating Savings Goals"
                description="How to set up and track your savings goals"
                timeToRead="6 min read"
              />
              <GuideCard
                title="Understanding Behavior Insights"
                description="Learn how to interpret your financial behavior analysis"
                timeToRead="8 min read"
              />
              <GuideCard
                title="Using Real-time Nudges"
                description="How to get the most out of our AI-powered nudges"
                timeToRead="5 min read"
              />
              <GuideCard
                title="Gamified Savings Features"
                description="Complete guide to challenges, rewards, and achievements"
                timeToRead="10 min read"
              />
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                View All Guides
              </Button>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-0">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardContent className="p-6 space-y-6">
                <FaqItem
                  question="How secure is my financial data?"
                  answer="We use bank-level 256-bit encryption to secure your data. We never store your bank credentials, and we use read-only access to analyze your transactions. Your security is our top priority."
                />
                <FaqItem
                  question="Can I use FinSavvy AI for free?"
                  answer="Yes, we offer a free Basic plan that includes essential features like basic spending analytics and the ability to connect up to 2 bank accounts. For more advanced features, you can upgrade to our Pro or Premium plans."
                />
                <FaqItem
                  question="How does the AI analyze my spending behavior?"
                  answer="Our AI analyzes patterns in your transaction history, including timing, location, merchant categories, and amounts. It identifies behavioral triggers and impulse spending habits, then provides personalized insights and recommendations."
                />
                <FaqItem
                  question="Can I cancel my subscription anytime?"
                  answer="Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to your paid features until the end of your current billing cycle."
                />
                <FaqItem
                  question="How do I connect my bank accounts?"
                  answer="Go to the 'Connect Bank' section in your dashboard, select your bank from the list, and follow the secure authentication process. We use industry-standard security protocols to ensure your information remains safe."
                />
                <FaqItem
                  question="What if I have multiple bank accounts?"
                  answer="Our Basic plan allows you to connect up to 2 bank accounts. Pro and Premium plans allow unlimited bank connections, giving you a complete view of your finances across all your accounts."
                />
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                View All FAQs
              </Button>
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <VideoCard
                title="Getting Started with FinSavvy AI"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="4:32"
              />
              <VideoCard
                title="How to Connect Your Bank Accounts"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="3:45"
              />
              <VideoCard
                title="Setting Up Savings Goals"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="5:18"
              />
              <VideoCard
                title="Understanding Your Behavior Insights"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="7:22"
              />
              <VideoCard
                title="Maximizing Savings with Challenges"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="6:10"
              />
              <VideoCard
                title="Using the AI Assistant Effectively"
                thumbnail="/placeholder.svg?height=200&width=350"
                duration="5:45"
              />
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                View All Videos
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Still Need Help?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Our support team is here to help you with any questions or
                issues
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
                  <MessageSquare className="h-4 w-4 mr-2" /> Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({ icon, title, description, articles }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="p-3 rounded-lg bg-gray-700/50 w-fit mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{description}</p>
        <ul className="space-y-2">
          {articles.map((article, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center text-sm"
              >
                <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{article}</span>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function GuideCard({ title, description, timeToRead }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{timeToRead}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 p-0 h-8 w-8 rounded-full"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FaqItem({ question, answer }) {
  return (
    <div className="border-b border-gray-700 pb-6">
      <h3 className="text-lg font-semibold mb-3 text-white">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
}

function VideoCard({ title, thumbnail, duration }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <Button
            variant="ghost"
            className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 p-0"
          >
            Watch Now <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Video({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 8.5a2.5 2.5 0 0 0-2.5-2.5H4.5A2.5 2.5 0 0 0 2 8.5v7a2.5 2.5 0 0 0 2.5 2.5h15a2.5 2.5 0 0 0 2.5-2.5v-7Z" />
      <path d="m14.5 12-5-3v6l5-3Z" />
    </svg>
  );
}
