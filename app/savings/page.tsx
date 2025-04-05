"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  PlusCircle,
  Settings,
  TrendingUp,
  Home,
  Car,
  Plane,
  Smartphone,
  Laptop,
  Briefcase,
  GraduationCap,
  AlertCircle,
  Check,
  Clock,
  CalendarDays,
} from "lucide-react";

// Mock savings goals data
const savingsGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 250000,
    current: 160000,
    deadline: "Dec 2025",
    category: "Security",
    icon: <AlertCircle className="h-5 w-5" />,
    autoDeposit: true,
    depositAmount: 5000,
    depositFrequency: "Monthly",
    status: "on-track",
  },
  {
    id: 2,
    title: "Travel to Europe",
    target: 150000,
    current: 60000,
    deadline: "Jul 2025",
    category: "Travel",
    icon: <Plane className="h-5 w-5" />,
    autoDeposit: true,
    depositAmount: 4000,
    depositFrequency: "Monthly",
    status: "on-track",
  },
  {
    id: 3,
    title: "Down Payment",
    target: 1500000,
    current: 300000,
    deadline: "Jan 2027",
    category: "Home",
    icon: <Home className="h-5 w-5" />,
    autoDeposit: true,
    depositAmount: 20000,
    depositFrequency: "Monthly",
    status: "at-risk",
  },
  {
    id: 4,
    title: "New Phone",
    target: 60000,
    current: 50000,
    deadline: "May 2025",
    category: "Gadgets",
    icon: <Smartphone className="h-5 w-5" />,
    autoDeposit: true,
    depositAmount: 2000,
    depositFrequency: "Bi-weekly",
    status: "completed",
  },
  {
    id: 5,
    title: "New Laptop",
    target: 120000,
    current: 35000,
    deadline: "Oct 2025",
    category: "Gadgets",
    icon: <Laptop className="h-5 w-5" />,
    autoDeposit: false,
    depositAmount: 0,
    depositFrequency: "None",
    status: "on-track",
  },
  {
    id: 6,
    title: "MBA Course",
    target: 350000,
    current: 50000,
    deadline: "Aug 2026",
    category: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    autoDeposit: true,
    depositAmount: 5000,
    depositFrequency: "Monthly",
    status: "at-risk",
  },
];

// Goal settings
const goalSettings = [
  {
    id: 1,
    name: "Auto Round-Up",
    description:
      "Round up transactions to nearest ₹100 and save the difference",
    enabled: true,
  },
  {
    id: 2,
    name: "Spending Cutbacks",
    description:
      "Automatically reduce spending in certain categories to meet goals",
    enabled: false,
  },
  {
    id: 3,
    name: "Windfall Allocation",
    description:
      "Automatically allocate a percentage of large deposits to your goals",
    enabled: true,
  },
  {
    id: 4,
    name: "Smart Deposit Adjustments",
    description:
      "Automatically adjust deposit amounts based on your spending patterns",
    enabled: true,
  },
  {
    id: 5,
    name: "Low Balance Protection",
    description:
      "Pause automatic savings if your account balance falls below threshold",
    enabled: true,
  },
];

// Goal reminders
const goalReminders = [
  {
    id: 1,
    name: "Weekly Progress",
    description: "Get a weekly update on all your savings goals",
    icon: <CalendarDays className="h-5 w-5 text-yellow-500" />,
    enabled: true,
  },
  {
    id: 2,
    name: "Milestone Celebrations",
    description:
      "Get notified when you reach savings milestones (25%, 50%, 75%)",
    icon: <Check className="h-5 w-5 text-yellow-500" />,
    enabled: true,
  },
  {
    id: 3,
    name: "Deadline Reminders",
    description: "Get reminders as you approach goal deadlines",
    icon: <Clock className="h-5 w-5 text-yellow-500" />,
    enabled: true,
  },
];

export default function SavingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [settings, setSettings] = useState(goalSettings);
  const [reminders, setReminders] = useState(goalReminders);

  const toggleSetting = (id) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const getFilteredGoals = () => {
    if (activeTab === "all") return savingsGoals;
    if (activeTab === "completed")
      return savingsGoals.filter((goal) => goal.status === "completed");
    if (activeTab === "at-risk")
      return savingsGoals.filter((goal) => goal.status === "at-risk");
    if (activeTab === "on-track")
      return savingsGoals.filter((goal) => goal.status === "on-track");
    return savingsGoals;
  };

  const filteredGoals = getFilteredGoals();

  // Calculate overall progress
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Savings Goals
            </h1>
            <p className="text-gray-400">
              Track, manage, and achieve your financial goals
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
            <PlusCircle className="h-4 w-4 mr-2" /> Create New Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Total Saved
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(totalSaved)}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Target Amount
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(totalTarget)}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Overall Progress
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {overallProgress.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-400">
                    Progress toward all goals
                  </h4>
                  <span className="text-sm text-gray-400">
                    {overallProgress.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={overallProgress}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-yellow-500"
                />
              </CardContent>
            </Card>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all">All Goals</TabsTrigger>
                  <TabsTrigger value="on-track">On Track</TabsTrigger>
                  <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                  {filteredGoals.length} Goals
                </Badge>
              </div>

              <TabsContent value="all" className="mt-0 space-y-4">
                {filteredGoals.map((goal) => (
                  <SavingsGoalCard
                    key={goal.id}
                    goal={goal}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </TabsContent>

              <TabsContent value="on-track" className="mt-0 space-y-4">
                {filteredGoals.map((goal) => (
                  <SavingsGoalCard
                    key={goal.id}
                    goal={goal}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </TabsContent>

              <TabsContent value="at-risk" className="mt-0 space-y-4">
                {filteredGoals.map((goal) => (
                  <SavingsGoalCard
                    key={goal.id}
                    goal={goal}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="mt-0 space-y-4">
                {filteredGoals.map((goal) => (
                  <SavingsGoalCard
                    key={goal.id}
                    goal={goal}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 text-yellow-500 mr-2" />
                  Goal Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customize how your savings goals work
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
                  <CalendarDays className="h-5 w-5 text-yellow-500 mr-2" />
                  Goal Reminders
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Stay updated on your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gray-700">
                        {reminder.icon}
                      </div>
                      <div className="space-y-0.5">
                        <Label className="text-white">{reminder.name}</Label>
                        <p className="text-gray-400 text-sm">
                          {reminder.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                      className="data-[state=checked]:bg-yellow-600"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                  Savings Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Maximize your savings potential with these strategies:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Set up automatic transfers to avoid the temptation to
                      spend
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Save unexpected income like bonuses or tax refunds
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Cut back on small daily expenses that add up over time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-300 text-sm">
                      Challenge yourself to no-spend days or weeks
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

// Component for individual savings goal cards
function SavingsGoalCard({ goal, formatCurrency }) {
  const progress = (goal.current / goal.target) * 100;

  // Determine status styling
  const getStatusBadge = () => {
    switch (goal.status) {
      case "completed":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Completed
          </Badge>
        );
      case "at-risk":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            At Risk
          </Badge>
        );
      case "on-track":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            On Track
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`p-2 rounded-full ${
                goal.status === "at-risk"
                  ? "bg-yellow-500/20"
                  : goal.status === "completed"
                  ? "bg-green-500/20"
                  : "bg-blue-500/20"
              }`}
            >
              {goal.icon}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-white">{goal.title}</h4>
              {getStatusBadge()}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="text-gray-400">
                  {formatCurrency(goal.current)} of{" "}
                  {formatCurrency(goal.target)}
                </span>
                <span className="text-gray-400">{progress.toFixed(1)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-gray-700"
                indicatorClassName={`${
                  goal.status === "at-risk"
                    ? "bg-yellow-500"
                    : goal.status === "completed"
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-700/50 rounded p-2">
                <h5 className="text-xs text-gray-400">Category</h5>
                <p className="text-sm text-white">{goal.category}</p>
              </div>
              <div className="bg-gray-700/50 rounded p-2">
                <h5 className="text-xs text-gray-400">Deadline</h5>
                <p className="text-sm text-white">{goal.deadline}</p>
              </div>
              {goal.autoDeposit && (
                <>
                  <div className="bg-gray-700/50 rounded p-2">
                    <h5 className="text-xs text-gray-400">Auto Deposit</h5>
                    <p className="text-sm text-white">
                      {formatCurrency(goal.depositAmount)}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded p-2">
                    <h5 className="text-xs text-gray-400">Frequency</h5>
                    <p className="text-sm text-white">
                      {goal.depositFrequency}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-sm border-gray-600 hover:bg-gray-700"
              >
                Edit Goal
              </Button>
              <Button
                size="sm"
                className={`h-8 px-3 text-sm ${
                  goal.status === "at-risk"
                    ? "bg-yellow-600 hover:bg-yellow-500"
                    : goal.status === "completed"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-blue-600 hover:bg-blue-500"
                } text-white`}
              >
                {goal.status === "completed" ? "Withdraw Funds" : "Add Funds"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
