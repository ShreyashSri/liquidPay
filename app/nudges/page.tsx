"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bell,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  Coffee,
  Utensils,
  Film,
  CheckCircle,
  X,
  Settings,
  Smartphone,
  Mail,
  MessageSquare,
  Loader2,
  Scale,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Nudge settings
const nudgeSettings = [
  {
    id: 1,
    name: "Spending Alerts",
    description:
      "Get notified when your spending in a category exceeds your usual patterns",
    enabled: true,
  },
  {
    id: 2,
    name: "Budget Alerts",
    description:
      "Receive alerts when you're approaching or have exceeded your budget limits",
    enabled: true,
  },
  {
    id: 3,
    name: "Behavioral Insights",
    description: "Get insights about your spending patterns and habits",
    enabled: true,
  },
  {
    id: 4,
    name: "Savings Opportunities",
    description:
      "Receive suggestions for potential savings based on your spending",
    enabled: true,
  },
  {
    id: 5,
    name: "Subscription Reminders",
    description:
      "Get reminded before subscriptions renew, especially for unused services",
    enabled: true,
  },
];

// Delivery preferences
const deliveryPreferences = [
  {
    id: 1,
    name: "Push Notifications",
    description: "Receive nudges as push notifications on your mobile device",
    icon: <Smartphone className="h-5 w-5 text-yellow-500" />,
    enabled: true,
  },
  {
    id: 2,
    name: "Email Alerts",
    description: "Receive nudges via email",
    icon: <Mail className="h-5 w-5 text-yellow-500" />,
    enabled: false,
  },
  {
    id: 3,
    name: "In-App Messages",
    description: "View nudges in the app's notification center",
    icon: <MessageSquare className="h-5 w-5 text-yellow-500" />,
    enabled: true,
  },
];

interface NudgeSetting {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}

interface DeliveryPreference {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface Goal {
  title: string;
  description: string;
  type?: string;
  category?: string;
}

interface Nudge {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  category: string;
  icon: React.ReactNode;
}

const NudgeCard = ({ nudge }: { nudge: Nudge }) => (
  <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
    <CardContent className="p-6">
      <div className="flex space-x-4">
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
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-medium text-white">
              {nudge.title}
            </h4>
            <Badge
              className={`${
                nudge.type === "warning"
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : nudge.type === "success"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
              }`}
            >
              {nudge.category}
            </Badge>
          </div>
          <p className="text-gray-300 mb-4">{nudge.message}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {nudge.time}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function NudgesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [settings, setSettings] = useState<NudgeSetting[]>(nudgeSettings);
  const [delivery, setDelivery] = useState<DeliveryPreference[]>(deliveryPreferences);
  const [nudges, setNudges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalizedGoals = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8188/api/auth/checkAuth", {
          withCredentials: true,
        });

        if (response.data.success && response.data.user) {
          try {
            // First get the user's transactions
            const transactionsResponse = await axios.get(
              `http://localhost:8188/api/transactions/${response.data.user._id}`,
              { withCredentials: true }
            );

            if (transactionsResponse.data && transactionsResponse.data.transactions) {
              // Calculate spending patterns
              const transactions = transactionsResponse.data.transactions;
              const needsSpending = transactions.reduce((total: number, day: any) => {
                return total + day.needs.reduce((sum: number, item: any) => sum + item.amount, 0);
              }, 0);
              
              const wantsSpending = transactions.reduce((total: number, day: any) => {
                return total + day.wants.reduce((sum: number, item: any) => sum + item.amount, 0);
              }, 0);

              const totalSpending = needsSpending + wantsSpending;
              const savingsRate = ((totalSpending / 7) * 30).toFixed(2); // Projected monthly spending

              // Generate personalized goals based on spending patterns
              const personalizedNudges = [
                {
                  id: 1,
                  title: "Monthly Spending Analysis",
                  message: `Based on your recent spending, you're projected to spend ₹${savingsRate} this month. Consider reviewing your expenses.`,
                  time: "Just now",
                  type: "info",
                  category: "Analysis",
                  icon: <TrendingUp className="h-5 w-5" />,
                },
                {
                  id: 2,
                  title: "Needs vs Wants Balance",
                  message: `Your needs spending (₹${needsSpending.toFixed(2)}) vs wants spending (₹${wantsSpending.toFixed(2)}) ratio is ${(needsSpending/wantsSpending).toFixed(2)}. Consider adjusting if needed.`,
                  time: "Just now",
                  type: "info",
                  category: "Balance",
                  icon: <Scale className="h-5 w-5" />,
                },
                {
                  id: 3,
                  title: "Daily Spending Average",
                  message: `Your average daily spending is ₹${(totalSpending/7).toFixed(2)}. Try to stay within this budget.`,
                  time: "Just now",
                  type: "success",
                  category: "Budget",
                  icon: <CreditCard className="h-5 w-5" />,
                }
              ];

              setNudges(personalizedNudges);
            } else {
              // Fallback to mock data if no transactions are found
              const mockNudges = [
                {
                  id: 1,
                  title: "Track Your Spending",
                  message: "Start tracking your daily expenses to better understand your spending patterns",
                  time: "Just now",
                  type: "info",
                  category: "Spending",
                  icon: <ShoppingBag className="h-5 w-5" />,
                },
                {
                  id: 2,
                  title: "Set a Budget",
                  message: "Create a monthly budget to help manage your finances better",
                  time: "Just now",
                  type: "info",
                  category: "Budget",
                  icon: <CreditCard className="h-5 w-5" />,
                },
                {
                  id: 3,
                  title: "Start Saving",
                  message: "Consider setting aside 20% of your income for savings",
                  time: "Just now",
                  type: "success",
                  category: "Savings",
                  icon: <TrendingUp className="h-5 w-5" />,
                }
              ];
              setNudges(mockNudges);
            }
          } catch (goalsError: any) {
            console.error("Error generating goals:", goalsError);
            setError("Failed to generate personalized goals. Please try again later.");
          }
        } else {
          setError("Please log in to view your personalized goals");
        }
      } catch (error: any) {
        console.error("Error checking authentication:", error);
        setError("Failed to authenticate. Please log in again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonalizedGoals();
  }, []);

  const getIconForCategory = (category:any) => {
    switch (category?.toLowerCase()) {
      case "spending":
        return <ShoppingBag className="h-5 w-5" />;
      case "savings":
        return <TrendingUp className="h-5 w-5" />;
      case "subscription":
        return <CreditCard className="h-5 w-5" />;
      case "food":
        return <Utensils className="h-5 w-5" />;
      case "entertainment":
        return <Film className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const toggleSetting = (id: number) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const toggleDelivery = (id: number) => {
    setDelivery(
      delivery.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const filteredNudges =
    activeTab === "all"
      ? nudges
      : nudges.filter((nudge) => nudge.type === activeTab);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Error</CardTitle>
            <CardDescription className="text-gray-400">{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Smart Nudges</h1>
            <p className="text-gray-400">
              Personalized notifications to help you make better financial
              decisions
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white">
            <Settings className="h-4 w-4 mr-2" /> Customize Nudges
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all">All Nudges</TabsTrigger>
                  <TabsTrigger value="warning">Alerts</TabsTrigger>
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="success">Positive</TabsTrigger>
                </TabsList>
                <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                  {filteredNudges.length} Nudges
                </Badge>
              </div>

              <TabsContent value="all" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <NudgeCard key={nudge.id} nudge={nudge} />
                ))}
              </TabsContent>

              <TabsContent value="warning" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <NudgeCard key={nudge.id} nudge={nudge} />
                ))}
              </TabsContent>

              <TabsContent value="info" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <NudgeCard key={nudge.id} nudge={nudge} />
                ))}
              </TabsContent>

              <TabsContent value="success" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <NudgeCard key={nudge.id} nudge={nudge} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 text-yellow-500 mr-2" />
                  Nudge Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customize which types of nudges you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label className="text-white">{setting.name}</Label>
                      <p className="text-gray-400 text-sm">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      onCheckedChange={() => toggleSetting(setting.id)}
                      className="data-[state=checked]:bg-yellow-600"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="h-5 w-5 text-yellow-500 mr-2" />
                  Delivery Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Choose how you want to receive nudges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {delivery.map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gray-700">
                        {pref.icon}
                      </div>
                      <div className="space-y-0.5">
                        <Label className="text-white">{pref.name}</Label>
                        <p className="text-gray-400 text-sm">
                          {pref.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={pref.enabled}
                      onCheckedChange={() => toggleDelivery(pref.id)}
                      className="data-[state=checked]:bg-yellow-600"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 text-yellow-500 mr-2" />
                  How Nudges Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Our AI analyzes your transaction data in real-time to provide
                  personalized nudges that help you:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Identify impulse spending before it happens
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Stay on track with your budgets and savings goals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Recognize and reinforce positive financial behaviors
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Make informed decisions about subscriptions and recurring
                      expenses
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
