"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Users,
  MessageSquare,
  Award,
  TrendingUp,
  ThumbsUp,
  MessageCircle,
  Share2,
  Calendar,
  MapPin,
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Users className="h-3.5 w-3.5 mr-1" /> Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              FinSavvy
            </span>{" "}
            Community
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Connect with other users, share tips, and learn from each other's
            financial journeys
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
              Join Community
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Browse Topics
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          <StatCard
            icon={<Users className="h-6 w-6 text-yellow-500" />}
            value="15,000+"
            label="Community Members"
          />
          <StatCard
            icon={<MessageSquare className="h-6 w-6 text-yellow-500" />}
            value="5,200+"
            label="Discussion Topics"
          />
          <StatCard
            icon={<Award className="h-6 w-6 text-yellow-500" />}
            value="850+"
            label="Success Stories"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-yellow-500" />}
            value="₹120M+"
            label="Collective Savings"
          />
        </div>

        {/* Search and Tabs */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search discussions, events, and success stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 bg-gray-800/50 border-gray-700 text-white focus-visible:ring-yellow-500 rounded-lg"
            />
          </div>

          <Tabs
            defaultValue="discussions"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-gray-800 p-1 w-full flex justify-start overflow-x-auto">
              <TabsTrigger
                value="discussions"
                className={`${
                  activeTab === "discussions"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
              <TabsTrigger
                value="success-stories"
                className={`${
                  activeTab === "success-stories"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Award className="h-4 w-4 mr-2" />
                Success Stories
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className={`${
                  activeTab === "events"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className={`${
                  activeTab === "challenges"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-
                className={\`${
                  activeTab === "challenges"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Challenges
              </TabsTrigger>
            </TabsList>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="mt-6">
              <div className="space-y-6">
                <DiscussionCard
                  title="How I reduced my food delivery spending by 70%"
                  author={{
                    name: "Priya S.",
                    avatar: "PS",
                  }}
                  category="Spending Habits"
                  replies={24}
                  likes={47}
                  time="2 hours ago"
                />
                <DiscussionCard
                  title="Best strategies for building an emergency fund?"
                  author={{
                    name: "Rahul P.",
                    avatar: "RP",
                  }}
                  category="Savings"
                  replies={36}
                  likes={82}
                  time="5 hours ago"
                />
                <DiscussionCard
                  title="How do you handle impulse shopping urges?"
                  author={{
                    name: "Ananya G.",
                    avatar: "AG",
                  }}
                  category="Behavior"
                  replies={42}
                  likes={65}
                  time="1 day ago"
                />
                <DiscussionCard
                  title="Which savings challenge had the biggest impact for you?"
                  author={{
                    name: "Vikram J.",
                    avatar: "VJ",
                  }}
                  category="Challenges"
                  replies={18}
                  likes={39}
                  time="2 days ago"
                />
                <DiscussionCard
                  title="Tips for negotiating subscription prices?"
                  author={{
                    name: "Neha K.",
                    avatar: "NK",
                  }}
                  category="Saving Tips"
                  replies={29}
                  likes={51}
                  time="3 days ago"
                />
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Discussions
                </Button>
              </div>
            </TabsContent>

            {/* Success Stories Tab */}
            <TabsContent value="success-stories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SuccessStoryCard
                  title="How I saved ₹2 Lakhs in 6 months"
                  author={{
                    name: "Arjun M.",
                    avatar: "AM",
                  }}
                  excerpt="Using FinSavvy's behavior insights, I identified my spending triggers and completely transformed my saving habits..."
                  savedAmount="₹2,00,000"
                  timeframe="6 months"
                />
                <SuccessStoryCard
                  title="From impulse shopper to super saver"
                  author={{
                    name: "Divya R.",
                    avatar: "DR",
                  }}
                  excerpt="I used to spend most of my salary within the first week. The real-time nudges helped me break this cycle and now I save 30% of my income..."
                  savedAmount="₹1,50,000"
                  timeframe="1 year"
                />
                <SuccessStoryCard
                  title="Paid off my education loan early"
                  author={{
                    name: "Karthik S.",
                    avatar: "KS",
                  }}
                  excerpt="By gamifying my savings and completing challenges, I was able to make extra payments on my education loan and pay it off 2 years early..."
                  savedAmount="₹3,50,000"
                  timeframe="2 years"
                />
                <SuccessStoryCard
                  title="Built my emergency fund from scratch"
                  author={{
                    name: "Meera P.",
                    avatar: "MP",
                  }}
                  excerpt="As a freelancer with irregular income, I never thought I could build an emergency fund. FinSavvy's AI recommendations helped me find opportunities to save..."
                  savedAmount="₹1,20,000"
                  timeframe="8 months"
                />
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Success Stories
                </Button>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EventCard
                  title="Financial Freedom Workshop"
                  date="November 25, 2023"
                  time="6:00 PM - 8:00 PM"
                  location="Online (Zoom)"
                  attendees={120}
                  description="Join our expert financial coaches for a workshop on building wealth and achieving financial freedom."
                />
                <EventCard
                  title="Investing for Beginners"
                  date="December 2, 2023"
                  time="5:30 PM - 7:30 PM"
                  location="Online (Zoom)"
                  attendees={85}
                  description="Learn the basics of investing and how to start building your investment portfolio with minimal risk."
                />
                <EventCard
                  title="FinSavvy Community Meetup - Mumbai"
                  date="December 10, 2023"
                  time="11:00 AM - 2:00 PM"
                  location="Cafe Coffee Day, Bandra West"
                  attendees={35}
                  description="Meet other FinSavvy users in Mumbai, share tips, and build your financial support network."
                />
                <EventCard
                  title="Debt-Free Living Masterclass"
                  date="December 15, 2023"
                  time="7:00 PM - 9:00 PM"
                  location="Online (Zoom)"
                  attendees={95}
                  description="Strategies and tactics to eliminate debt faster and live a debt-free life."
                />
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Events
                </Button>
              </div>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChallengeCard
                  title="No-Spend November"
                  participants={342}
                  timeLeft="5 days"
                  description="Challenge yourself to go the entire month of November without any non-essential spending."
                  prize="₹10,000 prize pool"
                />
                <ChallengeCard
                  title="30-Day Meal Prep Challenge"
                  participants={215}
                  timeLeft="12 days"
                  description="Prepare all your lunches at home for 30 days and track your savings from not eating out."
                  prize="₹5,000 prize pool"
                />
                <ChallengeCard
                  title="Subscription Audit Challenge"
                  participants={178}
                  timeLeft="18 days"
                  description="Audit all your subscriptions and cancel at least 3 that you don't use regularly."
                  prize="₹3,000 prize pool"
                />
                <ChallengeCard
                  title="Save 50% of Income Challenge"
                  participants={124}
                  timeLeft="25 days"
                  description="Challenge yourself to save 50% of your income for one month."
                  prize="₹15,000 prize pool"
                />
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View All Challenges
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Community Leaders */}
        <div className="max-w-5xl mx-auto mt-16 mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Community Leaders
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Meet Our Top Contributors
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              These members have helped thousands with their financial journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <LeaderCard
              name="Rahul Patel"
              role="Savings Expert"
              contributions={245}
              avatar="RP"
            />
            <LeaderCard
              name="Priya Sharma"
              role="Behavior Specialist"
              contributions={198}
              avatar="PS"
            />
            <LeaderCard
              name="Vikram Joshi"
              role="Investment Guru"
              contributions={176}
              avatar="VJ"
            />
            <LeaderCard
              name="Ananya Gupta"
              role="Debt-Free Coach"
              contributions={152}
              avatar="AG"
            />
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ready to join our community?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Connect with like-minded individuals on their financial journeys
              </p>
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] mx-auto">
                Join the Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-lg bg-gray-700/50 mb-4">{icon}</div>
        <span className="text-2xl font-bold text-white mb-1">{value}</span>
        <span className="text-gray-400 text-sm">{label}</span>
      </CardContent>
    </Card>
  );
}

function DiscussionCard({ title, author, category, replies, likes, time }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            {category}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-white">
                {author.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white text-sm">{author.name}</span>
              <span className="text-gray-500 text-xs ml-2">{time}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{replies}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SuccessStoryCard({ title, author, excerpt, savedAmount, timeframe }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <div className="flex items-center mb-4">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-white">
              {author.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-white text-sm">{author.name}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">Saved</span>
            <p className="text-green-400 font-semibold">{savedAmount}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Timeframe</span>
            <p className="text-white">{timeframe}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-700/30 px-6 py-3 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white p-0"
        >
          Read Full Story
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white p-0"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function EventCard({ title, date, time, location, attendees, description }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-yellow-500" />
            <span>
              {date} • {time}
            </span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Users className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{attendees} attending</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      </CardContent>
      <CardFooter className="bg-gray-700/30 px-6 py-3">
        <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

function ChallengeCard({ title, participants, timeLeft, description, prize }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            {timeLeft} left
          </Badge>
        </div>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{participants} participants</span>
          </div>
          <span className="text-yellow-400 font-medium">{prize}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-700/30 px-6 py-3">
        <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
          Join Challenge
        </Button>
      </CardFooter>
    </Card>
  );
}

function LeaderCard({ name, role, contributions, avatar }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Avatar className="h-16 w-16 mb-4">
          <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-white text-xl">
            {avatar}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        <p className="text-yellow-500 text-sm mb-2">{role}</p>
        <div className="flex items-center text-gray-400 text-sm">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{contributions} contributions</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-700/30 px-6 py-3">
        <Button
          variant="ghost"
          className="w-full text-gray-300 hover:text-white"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
