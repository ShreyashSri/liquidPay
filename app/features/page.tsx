"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingUp,
  Bell,
  Shield,
  Zap,
  MessageSquare,
  BarChart3,
  PieChart,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import AIFeatures3D from "@/components/ai-features-3d";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("core");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> AI-Powered
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Advanced{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              AI Features
            </span>{" "}
            for Better Financial Habits
          </h1>
          <p className="text-xl text-gray-400">
            Discover how our cutting-edge AI technology helps you transform your
            financial behavior and achieve your savings goals.
          </p>
        </div>

        {/* 3D AI Visualization */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">
              AI Technology Visualization
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our AI brain that powers financial behavior analysis
            </p>
          </div>

          <AIFeatures3D />
        </div>

        {/* Features Tabs */}
        <Tabs
          defaultValue="core"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger
                value="core"
                className={`${
                  activeTab === "core"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Brain className="h-4 w-4 mr-2" />
                Core AI
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className={`${
                  activeTab === "analysis"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analysis Tools
              </TabsTrigger>
              <TabsTrigger
                value="behavioral"
                className={`${
                  activeTab === "behavioral"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Behavioral Science
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Core AI Features */}
          <TabsContent value="core" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-yellow-500" />}
                title="Predictive Analysis"
                description="Our AI predicts your spending patterns and identifies potential impulse purchases before they happen."
                gradient="from-yellow-600 to-yellow-400"
              />
              <FeatureCard
                icon={<MessageSquare className="h-6 w-6 text-yellow-500" />}
                title="AI Assistant"
                description="Chat with our AI assistant to get personalized financial advice and insights about your spending habits."
                gradient="from-yellow-600 to-yellow-400"
              />
              <FeatureCard
                icon={<Bell className="h-6 w-6 text-yellow-500" />}
                title="Smart Nudges"
                description="Receive timely notifications that help you make better financial decisions in the moment."
                gradient="from-yellow-600 to-yellow-400"
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-yellow-500" />}
                title="Secure Encryption"
                description="Bank-level encryption ensures your financial data remains private and protected at all times."
                gradient="from-yellow-600 to-yellow-400"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
                title="Real-time Processing"
                description="Our AI analyzes transactions in real-time to provide immediate feedback and recommendations."
                gradient="from-yellow-600 to-yellow-400"
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-yellow-500" />}
                title="Personalized Insights"
                description="The more you use FinSavvy, the smarter it gets, providing increasingly personalized recommendations."
                gradient="from-yellow-600 to-yellow-400"
              />
            </div>
          </TabsContent>

          {/* Analysis Tools */}
          <TabsContent value="analysis" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-yellow-500" />}
                title="Spending Analytics"
                description="Visualize your spending patterns across different categories, time periods, and merchants."
                gradient="from-blue-600 to-blue-400"
              />
              <FeatureCard
                icon={<PieChart className="h-6 w-6 text-yellow-500" />}
                title="Budget Allocation"
                description="AI-powered recommendations for optimal budget allocation based on your income and goals."
                gradient="from-blue-600 to-blue-400"
              />
              <FeatureCard
                icon={<Target className="h-6 w-6 text-yellow-500" />}
                title="Goal Tracking"
                description="Set savings goals and track your progress with predictive timelines and recommendations."
                gradient="from-blue-600 to-blue-400"
              />
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6 text-yellow-500" />}
                title="Financial Forecasting"
                description="Predict your future financial state based on current habits and receive optimization suggestions."
                gradient="from-blue-600 to-blue-400"
              />
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-yellow-500" />}
                title="Anomaly Detection"
                description="Automatically identify unusual spending patterns and potential fraud in your accounts."
                gradient="from-blue-600 to-blue-400"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
                title="Subscription Tracker"
                description="Identify all your subscriptions and receive recommendations on which ones to keep or cancel."
                gradient="from-blue-600 to-blue-400"
              />
            </div>
          </TabsContent>

          {/* Behavioral Science */}
          <TabsContent value="behavioral" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-yellow-500" />}
                title="Habit Formation"
                description="Scientifically designed interventions that help you build positive financial habits over time."
                gradient="from-green-600 to-green-400"
              />
              <FeatureCard
                icon={<Target className="h-6 w-6 text-yellow-500" />}
                title="Gamified Savings"
                description="Earn rewards and unlock achievements as you build better financial habits and reach savings goals."
                gradient="from-green-600 to-green-400"
              />
              <FeatureCard
                icon={<Bell className="h-6 w-6 text-yellow-500" />}
                title="Behavioral Triggers"
                description="Identify emotional and environmental triggers that lead to impulse spending."
                gradient="from-green-600 to-green-400"
              />
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6 text-yellow-500" />}
                title="Progress Visualization"
                description="Visual representations of your behavioral changes and financial improvements over time."
                gradient="from-green-600 to-green-400"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
                title="Micro-Challenges"
                description="Small, achievable financial challenges designed to gradually improve your financial behavior."
                gradient="from-green-600 to-green-400"
              />
              <FeatureCard
                icon={<MessageSquare className="h-6 w-6 text-yellow-500" />}
                title="Community Support"
                description="Connect with others on similar financial journeys for motivation and accountability."
                gradient="from-green-600 to-green-400"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Interactive Demo */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Interactive Demo
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              See AI in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience how our AI analyzes spending patterns and provides
              real-time insights
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Spending Pattern Analysis
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">Coffee Shops</span>
                      <span className="text-yellow-400">₹4,500/month</span>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div
                        className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-400 text-xs">
                        75% of dining budget
                      </span>
                      <span className="text-gray-400 text-xs">
                        30% higher than average
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">Online Shopping</span>
                      <span className="text-yellow-400">₹12,000/month</span>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div
                        className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-400 text-xs">
                        90% of shopping budget
                      </span>
                      <span className="text-red-400 text-xs">
                        45% higher than average
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">Subscriptions</span>
                      <span className="text-yellow-400">₹2,800/month</span>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full">
                      <div
                        className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-400 text-xs">
                        60% of entertainment budget
                      </span>
                      <span className="text-gray-400 text-xs">
                        20% higher than average
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  AI-Generated Insights
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-1">
                      Impulse Shopping Pattern Detected
                    </h4>
                    <p className="text-gray-300 text-sm">
                      You tend to make large online purchases between 10PM and
                      2AM. These late-night purchases are 60% more likely to be
                      returned.
                    </p>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-1">
                      Coffee Spending Opportunity
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Reducing coffee shop visits from 20 to 15 times per month
                      could save you ₹1,250 without significantly impacting your
                      routine.
                    </p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-1">
                      Subscription Optimization
                    </h4>
                    <p className="text-gray-300 text-sm">
                      You haven't used your Netflix and Spotify accounts in 45
                      days. Pausing these subscriptions could save ₹998 monthly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Our Technology
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our platform combines multiple AI technologies to deliver
              personalized financial guidance
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Machine Learning Models
                </h3>
                <ul className="space-y-3">
                  <TechItem>
                    Neural networks for pattern recognition in spending behavior
                  </TechItem>
                  <TechItem>
                    Natural language processing for conversational AI assistance
                  </TechItem>
                  <TechItem>
                    Predictive algorithms for financial forecasting
                  </TechItem>
                  <TechItem>
                    Reinforcement learning for personalized recommendations
                  </TechItem>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Behavioral Science Integration
                </h3>
                <ul className="space-y-3">
                  <TechItem>
                    Cognitive behavioral techniques to modify spending habits
                  </TechItem>
                  <TechItem>
                    Gamification elements based on behavioral economics
                  </TechItem>
                  <TechItem>
                    Habit formation frameworks for sustainable change
                  </TechItem>
                  <TechItem>Personalized nudge theory implementation</TechItem>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to transform your financial habits?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 py-6 px-8"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden group">
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`}></div>
      <CardContent className="p-6 pt-8">
        <div className="p-3 rounded-lg bg-gray-700/50 w-fit mb-4 group-hover:bg-yellow-500/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-yellow-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}

function TechItem({ children }) {
  return (
    <li className="flex items-start">
      <div className="p-1 rounded-full bg-yellow-500/20 mr-3 mt-1">
        <Sparkles className="h-3 w-3 text-yellow-500" />
      </div>
      <span className="text-gray-300">{children}</span>
    </li>
  );
}
