"use client";

import { useState } from "react";
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
} from "lucide-react";

// Mock nudges data
const nudges = [
  {
    id: 1,
    title: "High Restaurant Spending",
    message:
      "You've spent ₹4,500 on restaurants this month, which is 30% higher than your usual. Want to set a limit?",
    time: "2 hours ago",
    type: "warning",
    category: "Spending",
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Subscription Renewal",
    message:
      "Your Netflix subscription (₹499) will renew tomorrow. You haven't watched in 45 days. Cancel?",
    time: "1 day ago",
    type: "info",
    category: "Subscriptions",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Savings Milestone",
    message:
      "Congrats! You've saved ₹10,000 this month. That's a new record! Keep it up!",
    time: "3 days ago",
    type: "success",
    category: "Savings",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Late Night Shopping",
    message:
      "We noticed you tend to shop online between 11PM-2AM. These purchases are 60% more likely to be returned.",
    time: "5 days ago",
    type: "warning",
    category: "Behavior",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "Coffee Budget Alert",
    message:
      "You're at 90% of your monthly coffee budget (₹2,250/₹2,500). Consider brewing at home for the rest of the month.",
    time: "1 week ago",
    type: "warning",
    category: "Budget",
    icon: <Coffee className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "Entertainment Spending Down",
    message:
      "Your entertainment spending is down 15% this month. Great job sticking to your budget!",
    time: "1 week ago",
    type: "success",
    category: "Behavior",
    icon: <Film className="h-5 w-5" />,
  },
];

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

export default function NudgesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [settings, setSettings] = useState(nudgeSettings);
  const [delivery, setDelivery] = useState(deliveryPreferences);

  const toggleSetting = (id) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const toggleDelivery = (id) => {
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
                  <Card
                    key={nudge.id}
                    className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all"
                  >
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
                            <div className="flex space-x-2">
                              {nudge.type === "warning" ||
                              nudge.type === "info" ? (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 text-sm border-gray-600 hover:bg-gray-700"
                                  >
                                    <X className="h-4 w-4 mr-1" /> Dismiss
                                  </Button>
                                  <Button
                                    size="sm"
                                    className={`h-8 px-3 text-sm ${
                                      nudge.type === "warning"
                                        ? "bg-yellow-600 hover:bg-yellow-500"
                                        : "bg-blue-600 hover:bg-blue-500"
                                    } text-white`}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />{" "}
                                    Take Action
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  className="h-8 px-3 text-sm bg-green-600 hover:bg-green-500 text-white"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />{" "}
                                  Acknowledge
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="warning" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <Card
                    key={nudge.id}
                    className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="p-2 rounded-full bg-yellow-500/20">
                            {nudge.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-medium text-white">
                              {nudge.title}
                            </h4>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              {nudge.category}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-4">{nudge.message}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              {nudge.time}
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-sm border-gray-600 hover:bg-gray-700"
                              >
                                <X className="h-4 w-4 mr-1" /> Dismiss
                              </Button>
                              <Button
                                size="sm"
                                className="h-8 px-3 text-sm bg-yellow-600 hover:bg-yellow-500 text-white"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Take
                                Action
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="info" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <Card
                    key={nudge.id}
                    className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="p-2 rounded-full bg-blue-500/20">
                            {nudge.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-medium text-white">
                              {nudge.title}
                            </h4>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {nudge.category}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-4">{nudge.message}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              {nudge.time}
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-sm border-gray-600 hover:bg-gray-700"
                              >
                                <X className="h-4 w-4 mr-1" /> Dismiss
                              </Button>
                              <Button
                                size="sm"
                                className="h-8 px-3 text-sm bg-blue-600 hover:bg-blue-500 text-white"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Take
                                Action
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="success" className="mt-0 space-y-4">
                {filteredNudges.map((nudge) => (
                  <Card
                    key={nudge.id}
                    className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="p-2 rounded-full bg-green-500/20">
                            {nudge.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-medium text-white">
                              {nudge.title}
                            </h4>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {nudge.category}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-4">{nudge.message}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              {nudge.time}
                            </span>
                            <Button
                              size="sm"
                              className="h-8 px-3 text-sm bg-green-600 hover:bg-green-500 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />{" "}
                              Acknowledge
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
