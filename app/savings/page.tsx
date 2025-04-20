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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Target,
  Trophy,
  Coins,
  Loader2,
  Sparkles,
  CheckCircle,
  Calendar,
  IndianRupee,
  Gift,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

interface Goal {
  _id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  reward: number;
  isCompleted: boolean;
  isAI: boolean;
  createdAt?: string;
}

interface NewGoalForm {
  title: string;
  description: string;
  targetAmount: string;
  deadline: string;
}

export default function SavingsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ai");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [lastGenerationTime, setLastGenerationTime] = useState<Date | null>(null);
  const [canGenerateGoals, setCanGenerateGoals] = useState(true);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state for manual goal creation
  const [newGoal, setNewGoal] = useState<NewGoalForm>({
    title: "",
    description: "",
    targetAmount: "",
    deadline: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  // Add a refresh function that can be called programmatically or on a button click
  const refreshData = async () => {
    if (userId) {
      await fetchGoals(userId);
      // Check if we can generate new goals by inspecting existing goals
      checkGenerationStatusBasedOnGoals();
    }
  };

  // Check generation status based on existing goals and last generation time
  const checkGenerationStatusBasedOnGoals = () => {
    if (!lastGenerationTime) {
      setCanGenerateGoals(true);
      setHoursRemaining(0);
      return;
    }

    const currentTime = new Date();
    const hoursSinceLastGeneration = (currentTime.getTime() - lastGenerationTime.getTime()) / (1000 * 60 * 60);
    const cooldownPassed = hoursSinceLastGeneration >= 24;
    
    setCanGenerateGoals(cooldownPassed);
    if (!cooldownPassed) {
      setHoursRemaining(Math.ceil(24 - hoursSinceLastGeneration));
    } else {
      setHoursRemaining(0);
    }
  };

  // Add an effect to periodically refresh the data
  useEffect(() => {
    if (userId) {
      // Set up interval to refresh data every minute
      const intervalId = setInterval(() => {
        refreshData();
      }, 60000); // 60000ms = 1 minute

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  // Add an effect to clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:8188/api/auth/checkAuth", {
        withCredentials: true,
      });

      if (response.data.success && response.data.user) {
        const id = response.data.user._id;
        setUserId(id);

        // Always fetch goals from database on page load/refresh
        await fetchGoals(id);
      } else {
        setError("User not authenticated");
        console.error("Please log in to view goals");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("Authentication error");
      console.error("Authentication error. Please log in again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGoals = async (id: string) => {
    try {
      setIsLoading(true);
      const goalsResponse = await axios.get(
        `http://localhost:8188/api/goals/${id}`,
        { withCredentials: true }
      );

      if (goalsResponse.data.success) {
        const fetchedGoals = goalsResponse.data.goals;
        setGoals(fetchedGoals);
        
        // Check if there's any AI-generated goal and get its creation date
        const aiGoals = fetchedGoals.filter((goal: Goal) => goal.isAI);
        if (aiGoals.length > 0) {
          // Sort by creation date, newest first
          aiGoals.sort((a: Goal, b: Goal) => {
            return a.createdAt && b.createdAt 
              ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              : 0;
          });
          if (aiGoals[0].createdAt) {
            setLastGenerationTime(new Date(aiGoals[0].createdAt));
          }
        }
        
        // Update generation status
        checkGenerationStatusBasedOnGoals();
      } else {
        setError(goalsResponse.data.message || "Failed to fetch goals");
        console.error(goalsResponse.data.message || "Failed to fetch goals");
      }
    } catch (error: any) {
      console.error("Error fetching goals:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch goals";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIGoals = async () => {
    if (!userId) {
      console.error("Please log in to generate goals");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      // Check if the user can generate goals
      if (!canGenerateGoals) {
        setError(`You can only generate goals once every 24 hours. Please wait ${hoursRemaining} hours.`);
        setIsGenerating(false);
        return;
      }

      // Don't generate new goals if there are existing ones
      if (goals.length > 0) {
        setError("You already have active goals. Please complete all of them before generating new ones.");
        setIsGenerating(false);
        return;
      }

      const goalsResponse = await axios.post(
        `http://localhost:8188/api/goals/generate/${userId}`,
        {},
        { withCredentials: true }
      );

      if (goalsResponse.data.success) {
        // Set last generation time to now
        setLastGenerationTime(new Date());
        // Set the new goals directly in state
        if (goalsResponse.data.goals) {
          setGoals(goalsResponse.data.goals);
        }
        setSuccessMessage("Generated personalized savings goals!");
        console.log("Generated personalized savings goals!");
      } else {
        const errorMessage = goalsResponse.data.message || "Failed to generate goals";
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error generating goals:", error);
      let errorMessage = "Failed to generate goals. Please try again.";

      if (error.response?.status === 429) {
        // Handle rate limiting error (429 Too Many Requests)
        errorMessage = error.response?.data?.message ||
          "You can only generate goals once every 24 hours. Please try again later.";
      } else {
        errorMessage = error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to generate goals. Please try again.";
      }

      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const completeGoal = async (goalId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8188/api/goals/complete/${goalId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update the local state directly instead of fetching all goals again
        setGoals(prevGoals => prevGoals.filter(g => g._id !== goalId));
        setSuccessMessage("Goal completed successfully!");
        
        try {
          // Call the daily reward endpoint to potentially award tokens
          if (userId) {
            const addRewardRes = await axios.post(
              `http://localhost:8188/api/goals/dailyreward/${userId}`,
              {},
              { withCredentials: true }
            );
            if (addRewardRes.data.success) {
              console.log("Reward processing:", addRewardRes.data.message);
              // If there was a reward, show it in the success message
              if (addRewardRes.data.message.includes("Rewarded")) {
                setSuccessMessage(addRewardRes.data.message);
              }
            }
          }
        } catch (rewardError) {
          console.error("Error adding reward:", rewardError);
        }
      } else {
        console.error(response.data.message || "Failed to complete goal");
        setError(response.data.message || "Failed to complete goal");
      }
    } catch (error: any) {
      console.error("Error completing goal:", error);
      setError(error.response?.data?.message || "Error completing goal");
    }
  };

  const createManualGoal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("Please log in to create goals");
      return;
    }

    try {
      setIsCreating(true);
      setError(null);

      // Check if there are any existing goals
      if (goals.length > 0) {
        setError("You already have goals. Please complete or delete them before creating new ones.");
        setIsCreating(false);
        return;
      }

      // Check if we're in the cooldown period
      if (!canGenerateGoals) {
        setError(`You can only create goals once every 24 hours. Please wait ${hoursRemaining} hours.`);
        setIsCreating(false);
        return;
      }

      const goalData = {
        title: newGoal.title,
        description: newGoal.description,
        targetAmount: parseFloat(newGoal.targetAmount),
        deadline: newGoal.deadline,
        currentAmount: 0,
        reward: 5, // Fixed reward of 5 SIT
        isCompleted: false,
        isAI: false
      };
      
      const response = await axios.post(
        `http://localhost:8188/api/goals/create/${userId}`,
        goalData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setNewGoal({
          title: "",
          description: "",
          targetAmount: "",
          deadline: "",
        });
        
        // Set last generation time to now
        setLastGenerationTime(new Date());
        
        // Add the new goal to the state instead of fetching all goals
        if (response.data.goal) {
          setGoals(prevGoals => [...prevGoals, response.data.goal]);
        }
        
        setSuccessMessage("Goal created successfully!");
      } else {
        setError(response.data.message || "Failed to create goal");
        console.error(response.data.message || "Failed to create goal");
      }
    } catch (error: any) {
      console.error("Error creating goal:", error);
      const errorMessage = error.response?.data?.message || "Failed to create goal";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  const updateGoalProgress = async (goalId: string, newAmount: number) => {
    try {
      // First update the goal in local state
      setGoals(prevGoals => prevGoals.map(g =>
        g._id === goalId ? { ...g, currentAmount: newAmount } : g
      ));
      
      // Then send the update to the server
      const response = await axios.post(
        `http://localhost:8188/api/goals/update/${goalId}`,
        { currentAmount: newAmount },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        console.log("Goal progress updated!");
        
        // If the goal is completed (currentAmount >= targetAmount),
        // mark it as completed automatically
        const updatedGoal = goals.find(g => g._id === goalId);
        if (updatedGoal && newAmount >= updatedGoal.targetAmount) {
          // Complete the goal if target reached
          await completeGoal(goalId);
        }
      } else {
        console.error(response.data.message || "Failed to update goal progress");
      }
    } catch (error: any) {
      console.error("Error updating goal progress:", error);
      console.error(error.response?.data?.message || "Error updating progress");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgressChange = (goalId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    if (isNaN(newAmount)) return;

    const goal = goals.find(g => g._id === goalId);
    if (!goal) return;

    // Update the goal locally
    setGoals(prevGoals => prevGoals.map(g =>
      g._id === goalId ? { ...g, currentAmount: newAmount } : g
    ));
  };

  const handleProgressBlur = (goalId: string) => {
    const goal = goals.find(g => g._id === goalId);
    if (!goal) return;

    updateGoalProgress(goalId, goal.currentAmount);
  };

  // Add a refresh button handler
  const handleRefresh = async () => {
    await refreshData();
    setSuccessMessage("Data refreshed successfully!");
  };

  // Add a helper function to render the cooldown info
  const renderCooldownInfo = () => {
    if (canGenerateGoals) {
      if (goals.length === 0) {
        return (
          <div className="bg-green-50 p-3 rounded-md mb-4 border border-green-200">
            <p className="text-green-700">You can generate new goals now!</p>
          </div>
        );
      }
      return null;
    }

    return (
      <div className="bg-yellow-50 p-3 rounded-md mb-4 border border-yellow-200">
        <p className="text-yellow-700">
          You can generate new goals in {hoursRemaining} hours.
        </p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Savings Goals</h1>
            <p className="text-gray-400">
              Track your savings goals and earn rewards for achieving them
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button
              onClick={generateAIGoals}
              disabled={isGenerating || !canGenerateGoals || goals.length > 0}
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate AI Goals
            </Button>
            <Button
              onClick={() => setActiveTab("manual")}
              className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Manual Goal
            </Button>
            <Button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Display error message if there is one */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Display cooldown information */}
        {renderCooldownInfo()}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-800 mb-6">
            <TabsTrigger value="ai">AI Generated Goals</TabsTrigger>
            <TabsTrigger value="manual">Manual Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-6">
            <div className="space-y-4">
              {goals
                .filter((goal) => goal.isAI)
                .map((goal) => (
                  <Card key={goal._id} className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {goal.title}
                          </h3>
                          <p className="text-gray-300 mb-4">{goal.description}</p>
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <IndianRupee className="h-3 w-3 mr-1" />
                              Target: ₹{Number(goal.targetAmount).toLocaleString()}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              <Coins className="h-3 w-3 mr-1" />
                              Current: ₹{Number(goal.currentAmount).toLocaleString()}
                            </Badge>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              <Calendar className="h-3 w-3 mr-1" />
                              Deadline: {new Date(goal.deadline).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <div className="flex items-center w-full md:w-2/3">
                              <Label className="mr-2 text-white w-20">Progress:</Label>
                              <Input
                                type="number"
                                value={goal.currentAmount}
                                onChange={(e) => handleProgressChange(goal._id, e)}
                                onBlur={() => handleProgressBlur(goal._id)}
                                className="bg-gray-700 border-gray-600 text-white"
                                min="0"
                                max={goal.targetAmount}
                              />
                            </div>
                            <Button
                              onClick={() => completeGoal(goal._id)}
                              className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" /> Mark Complete
                            </Button>
                          </div>
                        </div>
                        {goal.isCompleted && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (goal.currentAmount / goal.targetAmount) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-end gap-2">
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2">
                            <Coins className="h-6 w-6 text-yellow-500" />
                            <span className="text-yellow-500 font-bold text-lg">5 SIT</span>
                          </div>
                          <span className="text-gray-400 text-sm">Reward on completion</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {goals.filter(goal => goal.isAI).length === 0 && (
                <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <Sparkles className="h-12 w-12 text-yellow-500 mb-4" />
                    <p className="text-gray-300 text-center mb-4">
                      No AI goals yet. Generate personalized goals based on your spending patterns.
                    </p>
                    <Button
                      onClick={generateAIGoals}
                      disabled={isGenerating || !canGenerateGoals || goals.length > 0}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Generate AI Goals
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Create New Goal</CardTitle>
                <CardDescription className="text-gray-400">
                  Set a new savings goal and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={createManualGoal} className="space-y-4">
                  <div>
                    <Label className="text-white" htmlFor="title">Goal Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newGoal.title}
                      onChange={handleInputChange}
                      placeholder="e.g., New Laptop"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white" htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newGoal.description}
                      onChange={handleInputChange}
                      placeholder="Describe your goal..."
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white" htmlFor="targetAmount">Target Amount (₹)</Label>
                      <Input
                        id="targetAmount"
                        name="targetAmount"
                        type="number"
                        value={newGoal.targetAmount}
                        onChange={handleInputChange}
                        placeholder="10000"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-white" htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={newGoal.deadline}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isCreating || !canGenerateGoals || goals.length > 0}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white"
                  >
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Create Goal
                  </Button>
                </form>
              </CardContent>
            </Card>

            {goals
              .filter((goal) => !goal.isAI)
              .map((goal) => (
                <Card
                  key={goal._id}
                  className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-gray-300 mb-4">{goal.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            Target: ₹{Number(goal.targetAmount).toLocaleString()}
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Coins className="h-3 w-3 mr-1" />
                            Current: ₹{Number(goal.currentAmount).toLocaleString()}
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            <Calendar className="h-3 w-3 mr-1" />
                            Deadline: {new Date(goal.deadline).toLocaleDateString()}
                          </Badge>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <div className="flex items-center w-full md:w-2/3">
                            <Label className="mr-2 text-white w-20">Progress:</Label>
                            <Input
                              type="number"
                              value={goal.currentAmount}
                              onChange={(e) => handleProgressChange(goal._id, e)}
                              onBlur={() => handleProgressBlur(goal._id)}
                              className="bg-gray-700 border-gray-600 text-white"
                              min="0"
                              max={goal.targetAmount}
                            />
                          </div>
                          <Button
                            onClick={() => completeGoal(goal._id)}
                            className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Mark Complete
                          </Button>
                        </div>
                      </div>
                      {goal.isCompleted && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (goal.currentAmount / goal.targetAmount) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <Coins className="h-6 w-6 text-yellow-500" />
                          <span className="text-yellow-500 font-bold text-lg">5 SIT</span>
                        </div>
                        <span className="text-gray-400 text-sm">Reward on completion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {goals.filter(goal => !goal.isAI).length === 0 && (
              <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Target className="h-12 w-12 text-yellow-500 mb-4" />
                  <p className="text-gray-300 text-center mb-4">
                    No manual goals yet. Create your own custom financial goal.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}