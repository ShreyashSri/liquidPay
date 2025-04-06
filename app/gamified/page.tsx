"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Target,
  Sparkles,
  Award,
  Star,
  Zap,
  TrendingUp,
  Gift,
  ArrowRight,
  Users,
  Medal,
  Crown,
} from "lucide-react";

export default function GamifiedSavingsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Trophy className="h-3.5 w-3.5 mr-1" /> Gamified Savings
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Make Saving{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Fun
            </span>{" "}
            and Rewarding
          </h1>
          <p className="text-xl text-gray-400">
            Turn your financial goals into an exciting journey with challenges,
            rewards, and achievements.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger
                value="overview"
                className={`${
                  activeTab === "overview"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className={`${
                  activeTab === "challenges"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Zap className="h-4 w-4 mr-2" />
                Challenges
              </TabsTrigger>
              <TabsTrigger
                value="rewards"
                className={`${
                  activeTab === "rewards"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Gift className="h-4 w-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className={`${
                  activeTab === "leaderboard"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">
                  How It Works
                </h2>
                <p className="text-gray-400 mb-6">
                  Our gamified savings system uses behavioral science and game
                  mechanics to make saving money more engaging and rewarding.
                  Complete challenges, earn points, unlock achievements, and
                  compete with friends.
                </p>

                <div className="space-y-6">
                  <FeatureItem
                    icon={<Target className="h-5 w-5 text-yellow-500" />}
                    title="Set Personalized Goals"
                    description="Create custom savings goals with target amounts and deadlines."
                  />
                  <FeatureItem
                    icon={<Zap className="h-5 w-5 text-yellow-500" />}
                    title="Complete Challenges"
                    description="Take on daily, weekly, and monthly savings challenges to earn points."
                  />
                  <FeatureItem
                    icon={<Award className="h-5 w-5 text-yellow-500" />}
                    title="Earn Achievements"
                    description="Unlock badges and achievements as you reach financial milestones."
                  />
                  <FeatureItem
                    icon={<Users className="h-5 w-5 text-yellow-500" />}
                    title="Compete with Friends"
                    description="Join savings leagues and compete with friends for top positions."
                  />
                  <FeatureItem
                    icon={<Gift className="h-5 w-5 text-yellow-500" />}
                    title="Redeem Rewards"
                    description="Use your earned points to redeem real-world rewards and discounts."
                  />
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
                <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Your Progress
                      </h3>
                      <p className="text-gray-400 text-sm">Level 7 Saver</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-400">
                        7
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">XP Progress</span>
                        <span className="text-white font-medium">750/1000</span>
                      </div>
                      <Progress
                        value={75}
                        className="h-2 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-yellow-600 to-yellow-400"
                      />
                      <p className="text-gray-500 text-sm mt-2">
                        250 XP until Level 8
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="text-white font-medium mb-4">
                        Recent Achievements
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                            <Star className="h-6 w-6 text-yellow-500" />
                          </div>
                          <span className="text-gray-400 text-xs text-center">
                            Savings Streak
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                            <TrendingUp className="h-6 w-6 text-yellow-500" />
                          </div>
                          <span className="text-gray-400 text-xs text-center">
                            Goal Master
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                            <Zap className="h-6 w-6 text-yellow-500" />
                          </div>
                          <span className="text-gray-400 text-xs text-center">
                            Budget Pro
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                      View All Achievements
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-white text-center">
                Your Savings Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <JourneyStep
                  number="1"
                  title="Beginner"
                  description="Start your savings journey"
                  isCompleted={true}
                />
                <JourneyStep
                  number="2"
                  title="Saver"
                  description="Save consistently for 1 month"
                  isCompleted={true}
                />
                <JourneyStep
                  number="3"
                  title="Achiever"
                  description="Complete 5 savings challenges"
                  isCompleted={true}
                />
                <JourneyStep
                  number="4"
                  title="Expert"
                  description="Reach 50% of your savings goal"
                  isActive={true}
                />
                <JourneyStep
                  number="5"
                  title="Master"
                  description="Achieve your first savings goal"
                />
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] mx-auto">
                Start Your Savings Journey{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ChallengeCard
                title="No-Spend Weekend"
                description="Go an entire weekend without spending any money"
                reward="200 XP"
                difficulty="Medium"
                timeLeft="2 days"
                progress={0}
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
              />
              <ChallengeCard
                title="Coffee Budget"
                description="Spend less than ₹1,000 on coffee this month"
                reward="300 XP"
                difficulty="Hard"
                timeLeft="15 days"
                progress={65}
                icon={<Target className="h-6 w-6 text-yellow-500" />}
              />
              <ChallengeCard
                title="Save ₹5,000"
                description="Save ₹5,000 this month towards your emergency fund"
                reward="500 XP"
                difficulty="Hard"
                timeLeft="15 days"
                progress={40}
                icon={<TrendingUp className="h-6 w-6 text-yellow-500" />}
              />
              <ChallengeCard
                title="Meal Prep Week"
                description="Prepare all your lunches at home for a week"
                reward="150 XP"
                difficulty="Easy"
                timeLeft="7 days"
                progress={28}
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
              />
              <ChallengeCard
                title="Budget Master"
                description="Stay within your budget in all categories this month"
                reward="400 XP"
                difficulty="Hard"
                timeLeft="15 days"
                progress={75}
                icon={<Award className="h-6 w-6 text-yellow-500" />}
              />
              <ChallengeCard
                title="Subscription Audit"
                description="Cancel at least one unused subscription"
                reward="100 XP"
                difficulty="Easy"
                timeLeft="Anytime"
                progress={0}
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
              />
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <RewardCard
                title="Amazon Gift Card"
                description="Redeem your points for an Amazon gift card"
                points="5,000"
                image="/placeholder.svg?height=100&width=100"
              />
              <RewardCard
                title="Movie Tickets"
                description="Get two movie tickets at PVR Cinemas"
                points="3,500"
                image="/placeholder.svg?height=100&width=100"
              />
              <RewardCard
                title="Coffee Voucher"
                description="Free coffee at Starbucks for a week"
                points="2,000"
                image="/placeholder.svg?height=100&width=100"
              />
              <RewardCard
                title="Premium Upgrade"
                description="One month of FinSavvy Premium for free"
                points="7,500"
                image="/placeholder.svg?height=100&width=100"
              />
              <RewardCard
                title="Financial Coaching"
                description="30-minute session with a financial coach"
                points="10,000"
                image="/placeholder.svg?height=100&width=100"
              />
              <RewardCard
                title="Cashback Bonus"
                description="5% additional cashback on all purchases for a month"
                points="8,000"
                image="/placeholder.svg?height=100&width=100"
              />
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">
                You currently have{" "}
                <span className="text-yellow-400 font-bold">2,750</span> points
              </p>
              <Button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white">
                View All Rewards
              </Button>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-0">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Monthly Savings League
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center order-2 md:order-1">
                  <div className="w-20 h-20 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
                    <Medal className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">2nd Place</p>
                    <p className="text-white font-medium">Rahul P.</p>
                    <p className="text-yellow-400 font-bold">₹18,500</p>
                  </div>
                </div>

                <div className="flex flex-col items-center order-1 md:order-2">
                  <div className="w-24 h-24 rounded-full bg-yellow-500/20 mb-4 flex items-center justify-center">
                    <Crown className="h-12 w-12 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-yellow-400 text-sm">1st Place</p>
                    <p className="text-white font-medium">Priya S.</p>
                    <p className="text-yellow-400 font-bold">₹22,750</p>
                  </div>
                </div>

                <div className="flex flex-col items-center order-3">
                  <div className="w-20 h-20 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
                    <Medal className="h-10 w-10 text-yellow-800" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">3rd Place</p>
                    <p className="text-white font-medium">Ananya G.</p>
                    <p className="text-yellow-400 font-bold">₹15,200</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <LeaderboardItem
                  position="4"
                  name="Vikram J."
                  amount="₹14,800"
                  isUser={true}
                />
                <LeaderboardItem position="5" name="Neha K." amount="₹12,350" />
                <LeaderboardItem
                  position="6"
                  name="Arjun M."
                  amount="₹10,500"
                />
                <LeaderboardItem position="7" name="Divya R." amount="₹9,750" />
                <LeaderboardItem
                  position="8"
                  name="Karthik S."
                  amount="₹8,200"
                />
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                Join Next Month's League
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Testimonials */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The gamified savings feature made saving fun for the first time in my life. I've saved ₹50,000 in just 3 months!"
              name="Priya Sharma"
              title="Marketing Professional"
            />
            <TestimonialCard
              quote="Competing with friends in the savings league motivated me to cut unnecessary expenses. Now I'm saving 30% of my income."
              name="Rahul Patel"
              title="Software Engineer"
            />
            <TestimonialCard
              quote="The challenges helped me break my impulse shopping habit. I've completed 15 challenges and earned enough points for a free coaching session!"
              name="Ananya Gupta"
              title="Recent Graduate"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to make saving fun?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              Start Your Savings Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 py-6 px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start">
      <div className="p-2 rounded-lg bg-gray-800 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function JourneyStep({
  number,
  title,
  description,
  isCompleted = false,
  isActive = false,
}) {
  return (
    <div className={`relative ${isActive ? "scale-110 z-10" : ""}`}>
      <Card
        className={`bg-gray-800/70 backdrop-blur-sm border ${
          isCompleted
            ? "border-green-500/30"
            : isActive
            ? "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
            : "border-gray-700"
        } transition-all overflow-hidden h-full`}
      >
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
              isCompleted
                ? "bg-green-500/20"
                : isActive
                ? "bg-yellow-500/20"
                : "bg-gray-700"
            }`}
          >
            {isCompleted ? (
              <Check className={`h-5 w-5 text-green-500`} />
            ) : (
              <span
                className={`font-bold ${
                  isActive ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                {number}
              </span>
            )}
          </div>
          <h4
            className={`font-medium mb-1 ${
              isActive
                ? "text-yellow-400"
                : isCompleted
                ? "text-green-400"
                : "text-white"
            }`}
          >
            {title}
          </h4>
          <p className="text-gray-400 text-xs">{description}</p>
        </CardContent>
      </Card>
      {number !== "5" && (
        <div
          className={`absolute top-1/2 -right-4 w-8 h-0.5 ${
            isCompleted ? "bg-green-500/30" : "bg-gray-700"
          } hidden md:block z-0`}
        ></div>
      )}
    </div>
  );
}

function ChallengeCard({
  title,
  description,
  reward,
  difficulty,
  timeLeft,
  progress,
  icon,
}) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-gray-700/50 w-fit">{icon}</div>
          <Badge
            className={`
            ${
              difficulty === "Easy"
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : difficulty === "Medium"
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }
          `}
          >
            {difficulty}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{description}</p>

        {progress > 0 && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-1.5 bg-gray-700"
              indicatorClassName="bg-gradient-to-r from-yellow-600 to-yellow-400"
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">Reward</span>
            <p className="text-yellow-400 font-semibold">{reward}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Time Left</span>
            <p className="text-white">{timeLeft}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-700/30 px-6 py-3">
        <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
          Accept Challenge
        </Button>
      </CardFooter>
    </Card>
  );
}

function RewardCard({ title, description, points, image }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-lg bg-gray-700/50 flex items-center justify-center">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 text-white text-center">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm text-center">{description}</p>

        <div className="flex justify-center items-center">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1">
            <span className="text-yellow-400 font-semibold">
              {points} points
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-700/30 px-6 py-3">
        <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white">
          Redeem Reward
        </Button>
      </CardFooter>
    </Card>
  );
}

function LeaderboardItem({ position, name, amount, isUser = false }) {
  return (
    <div
      className={`flex items-center p-4 rounded-lg ${
        isUser
          ? "bg-yellow-500/10 border border-yellow-500/30"
          : "bg-gray-700/50"
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-4">
        <span
          className={`text-sm font-medium ${
            isUser ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          {position}
        </span>
      </div>
      <div className="flex-1">
        <p
          className={`font-medium ${isUser ? "text-yellow-400" : "text-white"}`}
        >
          {name}
        </p>
      </div>
      <div className="text-right">
        <p
          className={`font-bold ${
            isUser ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          {amount}
        </p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name, title }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute -top-6 -left-2 text-yellow-500 text-6xl opacity-20">
            "
          </div>
          <p className="text-gray-300 relative z-10 mb-6">{quote}</p>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-white font-medium">{name}</p>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Check({ className }) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
