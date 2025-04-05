"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Coffee,
  ShoppingBag,
  Utensils,
  Film,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const behaviors = {
  impulse: [
    {
      id: 1,
      title: "Late Night Shopping",
      description: "You tend to make unplanned purchases between 10PM and 2AM.",
      impact: "high",
      savings: "₹3,200/month",
      icon: <ShoppingBag className="h-5 w-5 text-red-500" />,
      progress: 75,
    },
    {
      id: 2,
      title: "Daily Coffee Runs",
      description:
        "You spend on coffee shops 18 times per month, averaging ₹250 per visit.",
      impact: "medium",
      savings: "₹2,500/month",
      icon: <Coffee className="h-5 w-5 text-yellow-500" />,
      progress: 60,
    },
    {
      id: 3,
      title: "Food Delivery",
      description:
        "You order food delivery 3-4 times per week, often during work hours.",
      impact: "medium",
      savings: "₹4,000/month",
      icon: <Utensils className="h-5 w-5 text-yellow-500" />,
      progress: 55,
    },
  ],
  positive: [
    {
      id: 1,
      title: "Consistent Savings",
      description:
        "You've maintained a regular savings deposit for 3 consecutive months.",
      impact: "high",
      trend: "up",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      progress: 85,
    },
    {
      id: 2,
      title: "Reduced Entertainment",
      description:
        "Your entertainment spending has decreased by 15% in the last month.",
      impact: "medium",
      trend: "up",
      icon: <Film className="h-5 w-5 text-green-500" />,
      progress: 65,
    },
    {
      id: 3,
      title: "Bill Payment Timing",
      description:
        "You've paid all bills on time for the past 6 months, avoiding late fees.",
      impact: "medium",
      trend: "up",
      icon: <CreditCard className="h-5 w-5 text-green-500" />,
      progress: 90,
    },
  ],
};

export default function BehaviorInsights() {
  const [activeTab, setActiveTab] = useState("impulse");

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(192,192,192,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
            AI Analysis
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Behavioral{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Insights
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our AI identifies your spending patterns and behaviors to help you
            make better financial decisions
          </p>
        </div>

        <Tabs
          defaultValue="impulse"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger
                value="impulse"
                className={`${
                  activeTab === "impulse"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                Impulse Behaviors
              </TabsTrigger>
              <TabsTrigger
                value="positive"
                className={`${
                  activeTab === "positive"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Positive Habits
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="impulse" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {behaviors.impulse.map((behavior) => (
                <Card
                  key={behavior.id}
                  className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-red-500/30 transition-all overflow-hidden group"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-red-400"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                        {behavior.icon}
                      </div>
                      <Badge
                        className={`
                        ${
                          behavior.impact === "high"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      `}
                      >
                        {behavior.impact === "high"
                          ? "High Impact"
                          : "Medium Impact"}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-red-400 transition-colors">
                      {behavior.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      {behavior.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Behavior Strength</span>
                        <span className="text-white font-medium">
                          {behavior.progress}%
                        </span>
                      </div>
                      <Progress
                        value={behavior.progress}
                        className="h-1.5 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-red-600 to-red-400"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-500">
                          Potential Savings
                        </span>
                        <p className="text-white font-semibold">
                          {behavior.savings}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-0 h-8 w-8 rounded-full"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positive" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {behaviors.positive.map((behavior) => (
                <Card
                  key={behavior.id}
                  className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-green-500/30 transition-all overflow-hidden group"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-green-600 to-green-400"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        {behavior.icon}
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {behavior.impact === "high"
                          ? "High Impact"
                          : "Medium Impact"}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
                      {behavior.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      {behavior.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Habit Strength</span>
                        <span className="text-white font-medium">
                          {behavior.progress}%
                        </span>
                      </div>
                      <Progress
                        value={behavior.progress}
                        className="h-1.5 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-green-600 to-green-400"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-500">Trend</span>
                        <p className="text-green-400 font-semibold flex items-center">
                          <TrendingUp className="h-3.5 w-3.5 mr-1" />
                          Improving
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10 p-0 h-8 w-8 rounded-full"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-all">
            View All Insights <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
