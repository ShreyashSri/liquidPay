"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, PieChart, ChartContainer } from "@/components/ui/chart";
import {
  TrendingUp,
  TrendingDown,
  Coffee,
  ShoppingBag,
  Utensils,
  Film,
  CreditCard,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  AlertCircle,
  Brain,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define TypeScript interfaces
interface SpendingData {
  day?: string;
  time?: string;
  location?: string;
  amount: number;
}

interface Behavior {
  id: number;
  title: string;
  description: string;
  impact: string;
  savings?: string;
  trend?: string;
  icon: React.ReactNode;
  progress: number;
  details: string;
}

interface Recommendation {
  id: number;
  title: string;
  description: string;
  impact: string;
  savings: string;
  category: string;
  icon: React.ReactNode;
}

interface BehaviorsData {
  impulse: Behavior[];
  positive: Behavior[];
}

// Mock data for spending patterns
const weekdaySpending: SpendingData[] = [
  { day: "Monday", amount: 450 },
  { day: "Tuesday", amount: 380 },
  { day: "Wednesday", amount: 520 },
  { day: "Thursday", amount: 490 },
  { day: "Friday", amount: 780 },
  { day: "Saturday", amount: 950 },
  { day: "Sunday", amount: 620 },
];

const timeOfDaySpending: SpendingData[] = [
  { time: "Morning (6AM-12PM)", amount: 1200 },
  { time: "Afternoon (12PM-5PM)", amount: 1800 },
  { time: "Evening (5PM-9PM)", amount: 2500 },
  { time: "Night (9PM-6AM)", amount: 1500 },
];

const locationSpending: SpendingData[] = [
  { location: "Online", amount: 3500 },
  { location: "Physical Stores", amount: 2800 },
  { location: "Restaurants", amount: 1800 },
  { location: "Entertainment Venues", amount: 900 },
];

// Mock data for behavior insights
const behaviors: BehaviorsData = {
  impulse: [
    {
      id: 1,
      title: "Late Night Shopping",
      description: "You tend to make unplanned purchases between 10PM and 2AM.",
      impact: "high",
      savings: "₹3,200/month",
      icon: <ShoppingBag className="h-5 w-5 text-red-500" />,
      progress: 75,
      details:
        "Analysis of your transaction history shows that 35% of your non-essential purchases occur late at night, often from e-commerce websites. These purchases are 60% more likely to be returned or unused compared to daytime purchases.",
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
      details:
        "Your spending at coffee shops has increased by 22% in the last 3 months. You visit coffee shops most frequently on weekday mornings, with an average transaction of ₹250. Reducing to 10 visits per month could save you ₹2,000.",
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
      details:
        "You spend approximately ₹8,000 per month on food delivery services, primarily during weekday lunches. This is 40% higher than the average for your income bracket. Meal prepping could save you up to ₹4,000 monthly.",
    },
    {
      id: 4,
      title: "Subscription Overload",
      description:
        "You have 8 active subscriptions, but regularly use only 4 of them.",
      impact: "medium",
      savings: "₹1,800/month",
      icon: <CreditCard className="h-5 w-5 text-yellow-500" />,
      progress: 65,
      details:
        "You currently spend ₹3,200 monthly on digital subscriptions. Usage data suggests you actively use only 50% of these services. Cancelling unused subscriptions could save ₹1,800 monthly.",
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
      details:
        "You've successfully maintained a savings rate of 22% of your income for the past 3 months, which is excellent. This puts you in the top 15% of savers in your income bracket. Keep up this habit to reach your emergency fund goal by June.",
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
      details:
        "Your entertainment spending has decreased from ₹6,500 to ₹5,525 in the last month. This positive trend has contributed significantly to your increased savings rate. You've found more cost-effective entertainment options without sacrificing enjoyment.",
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
      details:
        "Your perfect record of on-time bill payments has saved you approximately ₹3,600 in potential late fees over the past 6 months. This habit also positively impacts your credit score, which has improved by 25 points during this period.",
    },
  ],
};

// Mock recommendations
const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Set a "Cooling Off" Period',
    description:
      "For online purchases over ₹2,000, wait 24 hours before completing the transaction.",
    impact: "high",
    savings: "₹2,800/month",
    category: "Shopping",
    icon: <ShoppingBag className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 2,
    title: "Coffee Budget",
    description:
      "Set a weekly coffee shop budget of ₹1,000 and track it with our app.",
    impact: "medium",
    savings: "₹1,500/month",
    category: "Food & Drink",
    icon: <Coffee className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 3,
    title: "Meal Prep Sundays",
    description:
      "Prepare lunches for the work week to reduce food delivery orders.",
    impact: "high",
    savings: "₹3,500/month",
    category: "Food & Drink",
    icon: <Utensils className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 4,
    title: "Subscription Audit",
    description: "Cancel 4 unused subscriptions identified by our analysis.",
    impact: "medium",
    savings: "₹1,800/month",
    category: "Entertainment",
    icon: <CreditCard className="h-5 w-5 text-yellow-500" />,
  },
];

// Define a custom Progress component that accepts indicatorClassName
interface CustomProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

const CustomProgress = ({ value, className, indicatorClassName }: CustomProgressProps) => {
  return (
    <div className={className}>
      <div 
        className={`h-full transition-all ${indicatorClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default function BehaviorAnalysisPage() {
  const [activeTab, setActiveTab] = useState("patterns");
  const [selectedBehavior, setSelectedBehavior] = useState<Behavior | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weekdayData, setWeekdayData] = useState<SpendingData[]>(weekdaySpending);
  const [timeOfDayData, setTimeOfDayData] = useState<SpendingData[]>(timeOfDaySpending);
  const [locationData, setLocationData] = useState<SpendingData[]>(locationSpending);
  const [behaviorsData, setBehaviors] = useState<BehaviorsData>(behaviors);
  const [recommendationsData, setRecommendations] = useState<Recommendation[]>(recommendations);

  const router = useRouter();
  const { data: session } = useSession();

  const fetchData = async () => {
    try {
      setLoading(true);
      const userId = session?.user?.email;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Fetch spending patterns
      const patternsResponse = await fetch(`/api/behavior/patterns/${userId}`);
      if (!patternsResponse.ok) {
        throw new Error("Failed to fetch spending patterns");
      }
      const patternsData = await patternsResponse.json();
      
      // Fetch behavior insights
      const insightsResponse = await fetch(`/api/behavior/insights/${userId}`);
      if (!insightsResponse.ok) {
        throw new Error("Failed to fetch behavior insights");
      }
      const insightsData = await insightsResponse.json();
      
      // Fetch recommendations
      const recommendationsResponse = await fetch(`/api/behavior/recommendations/${userId}`);
      if (!recommendationsResponse.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const recommendationsData = await recommendationsResponse.json();

      // Update state with fetched data
      if (patternsData.weekdaySpending) setWeekdayData(patternsData.weekdaySpending);
      if (patternsData.timeOfDaySpending) setTimeOfDayData(patternsData.timeOfDaySpending);
      if (patternsData.locationSpending) setLocationData(patternsData.locationSpending);
      if (insightsData.behaviors) setBehaviors(insightsData.behaviors);
      if (recommendationsData.recommendations) setRecommendations(recommendationsData.recommendations);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Behavior Analysis
            </h1>
            <p className="text-gray-400">
              AI-powered insights into your financial habits and patterns
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
            <Brain className="h-4 w-4 mr-2" /> Get Custom Analysis
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Error Loading Data
                </h3>
                <p className="text-gray-300">{error}</p>
                <Button 
                  className="mt-4 bg-red-600 hover:bg-red-500 text-white"
                  onClick={() => fetchData()}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <Tabs
            defaultValue="patterns"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-800 p-1">
                <TabsTrigger
                  value="patterns"
                  className={`${
                    activeTab === "patterns"
                      ? "bg-gray-700 text-white"
                      : "text-gray-400"
                  } px-6 py-2`}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Spending Patterns
                </TabsTrigger>
                <TabsTrigger
                  value="behaviors"
                  className={`${
                    activeTab === "behaviors"
                      ? "bg-gray-700 text-white"
                      : "text-gray-400"
                  } px-6 py-2`}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Behavior Insights
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className={`${
                    activeTab === "recommendations"
                      ? "bg-gray-700 text-white"
                      : "text-gray-400"
                  } px-6 py-2`}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Recommendations
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="patterns" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-yellow-500 mr-2" />
                      <CardTitle className="text-white">
                        Spending by Day of Week
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      When you tend to spend the most during the week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer>
                        <BarChart
                          data={weekdayData}
                          index="day"
                          categories={["amount"]}
                          colors={["#ffd700"]}
                          valueFormatter={(value: number) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      <CardTitle className="text-white">
                        Spending by Time of Day
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      When you spend the most during the day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer>
                        <PieChart
                          data={timeOfDayData}
                          index="time"
                          category="amount"
                          colors={["#c0c0c0", "#a0a0a0", "#ffd700", "#808080"]}
                          valueFormatter={(value: number) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-800 border-gray-700 shadow-lg mb-8">
                <CardHeader>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-yellow-500 mr-2" />
                    <CardTitle className="text-white">
                      Spending by Location Type
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Where you tend to spend your money
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer>
                      <BarChart
                        data={locationData}
                        index="location"
                        categories={["amount"]}
                        colors={["#ffd700"]}
                        valueFormatter={(value: number) => `₹${value}`}
                        className="h-80"
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Key Insights
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          You spend <strong>45% more on weekends</strong> compared
                          to weekdays.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Evening hours (5PM-9PM) account for{" "}
                          <strong>35% of your total spending</strong>.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Online shopping represents{" "}
                          <strong>39% of your monthly expenses</strong>, higher
                          than the average of 25%.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Your spending peaks on <strong>Friday evenings</strong>,
                          often on dining and entertainment.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behaviors" className="mt-0">
              {selectedBehavior ? (
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    className="mb-4 text-gray-400 hover:text-white"
                    onClick={() => setSelectedBehavior(null)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Behaviors
                  </Button>

                  <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
                    <div
                      className={`h-1.5 w-full ${
                        selectedBehavior.impact === "high" &&
                        "trend" in selectedBehavior
                          ? "bg-gradient-to-r from-green-600 to-green-400"
                          : selectedBehavior.impact === "high"
                          ? "bg-gradient-to-r from-red-600 to-red-400"
                          : "trend" in selectedBehavior
                          ? "bg-gradient-to-r from-green-600 to-green-400"
                          : "bg-gradient-to-r from-yellow-600 to-yellow-400"
                      }`}
                    ></div>
                    <CardHeader>
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-lg ${
                            "trend" in selectedBehavior
                              ? "bg-green-500/10"
                              : selectedBehavior.impact === "high"
                              ? "bg-red-500/10"
                              : "bg-yellow-500/10"
                          } mr-3`}
                        >
                          {selectedBehavior.icon}
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">
                            {selectedBehavior.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            {selectedBehavior.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Behavior Strength</span>
                          <span className="text-white font-medium">
                            {selectedBehavior.progress}%
                          </span>
                        </div>
                        <CustomProgress
                          value={selectedBehavior.progress}
                          className="h-2 bg-gray-700"
                          indicatorClassName={`${
                            "trend" in selectedBehavior
                              ? "bg-gradient-to-r from-green-600 to-green-400"
                              : selectedBehavior.impact === "high"
                              ? "bg-gradient-to-r from-red-600 to-red-400"
                              : "bg-gradient-to-r from-yellow-600 to-yellow-400"
                          }`}
                        />
                      </div>

                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">
                          Detailed Analysis
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {selectedBehavior.details}
                        </p>
                      </div>

                      {"savings" in selectedBehavior && (
                        <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-yellow-500 mr-2" />
                            <div>
                              <p className="text-gray-300 text-sm">
                                Potential Monthly Savings
                              </p>
                              <p className="text-white font-semibold text-lg">
                                {selectedBehavior.savings}
                              </p>
                            </div>
                          </div>
                          <Button className="bg-yellow-600 hover:bg-yellow-500 text-white">
                            Get Recommendations
                          </Button>
                        </div>
                      )}

                      {"trend" in selectedBehavior && (
                        <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                              <p className="text-gray-300 text-sm">
                                Positive Trend
                              </p>
                              <p className="text-white font-semibold text-lg">
                                Keep it up!
                              </p>
                            </div>
                          </div>
                          <Button className="bg-green-600 hover:bg-green-500 text-white">
                            Set New Goals
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <>
                  <Tabs defaultValue="impulse" className="w-full">
                    <TabsList className="bg-gray-700 mb-6">
                      <TabsTrigger value="impulse">
                        <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                        Impulse Behaviors
                      </TabsTrigger>
                      <TabsTrigger value="positive">
                        <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                        Positive Habits
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="impulse" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {behaviorsData.impulse.map((behavior) => (
                          <Card
                            key={behavior.id}
                            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-red-500/30 transition-all overflow-hidden group cursor-pointer"
                            onClick={() => setSelectedBehavior(behavior)}
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
                                  <span className="text-gray-400">
                                    Behavior Strength
                                  </span>
                                  <span className="text-white font-medium">
                                    {behavior.progress}%
                                  </span>
                                </div>
                                <CustomProgress
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {behaviorsData.positive.map((behavior) => (
                          <Card
                            key={behavior.id}
                            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-green-500/30 transition-all overflow-hidden group cursor-pointer"
                            onClick={() => setSelectedBehavior(behavior)}
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
                                  <span className="text-gray-400">
                                    Habit Strength
                                  </span>
                                  <span className="text-white font-medium">
                                    {behavior.progress}%
                                  </span>
                                </div>
                                <CustomProgress
                                  value={behavior.progress}
                                  className="h-1.5 bg-gray-700"
                                  indicatorClassName="bg-gradient-to-r from-green-600 to-green-400"
                                />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="text-xs text-gray-500">
                                    Trend
                                  </span>
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

                  <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="flex items-start">
                      <Brain className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          How We Analyze Your Behavior
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Our AI analyzes thousands of data points from your
                          transaction history to identify patterns and behaviors
                          that impact your financial health. We look at:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>
                              Timing patterns (day of week, time of day)
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Location and merchant categories</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Transaction frequency and amounts</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>
                              Emotional triggers and impulse spending indicators
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {recommendationsData.map((recommendation) => (
                  <Card
                    key={recommendation.id}
                    className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden hover:border-yellow-500/30 transition-all group"
                  >
                    <div className="h-1.5 w-full bg-gradient-to-r from-yellow-600 to-yellow-400"></div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                          {recommendation.icon}
                        </div>
                        <Badge
                          className={`
                          ${
                            recommendation.impact === "high"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }
                        `}
                        >
                          {recommendation.impact === "high"
                            ? "High Impact"
                            : "Medium Impact"}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                        {recommendation.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm">
                        {recommendation.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500">
                            Potential Savings
                          </span>
                          <p className="text-white font-semibold">
                            {recommendation.savings}
                          </p>
                        </div>
                        <Button className="bg-yellow-600 hover:bg-yellow-500 text-white text-sm">
                          Apply This Tip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gray-800 border-gray-700 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-white">
                    Projected Savings Impact
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Potential monthly savings if you implement all recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer>
                      <BarChart
                        data={[
                          { category: "Current Spending", amount: 25000 },
                          { category: "Potential Spending", amount: 15400 },
                          { category: "Monthly Savings", amount: 9600 },
                        ]}
                        index="category"
                        categories={["amount"]}
                        colors={["#ffd700"]}
                        valueFormatter={(value: number) => `₹${value}`}
                        className="h-80"
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-start">
                  <Lightbulb className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      How Our Recommendations Work
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Our AI analyzes your specific spending patterns and
                      behaviors to generate personalized recommendations that:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Are realistic and achievable based on your lifestyle
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Target your highest-impact spending behaviors first
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Provide specific, actionable steps rather than general
                          advice
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>
                          Adapt over time as your financial habits change
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

interface IconProps {
  className?: string;
}

const Lightbulb = ({ className }: IconProps) => {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
};

const ArrowLeft = ({ className }: IconProps) => {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
};

const BarChart3 = ({ className }: IconProps) => {
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
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
};
