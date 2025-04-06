"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Our Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Financial{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Insights
            </span>{" "}
            & Stories
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Expert advice, success stories, and the latest in financial behavior
            science
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 bg-gray-800/50 border-gray-700 text-white focus-visible:ring-yellow-500 rounded-lg"
            />
          </div>
        </div>

        {/* Featured Article */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Featured Article"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  Featured
                </Badge>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  5 Behavioral Hacks to Save 30% More Each Month
                </h2>
                <p className="text-gray-400 mb-6">
                  Discover how small behavioral changes can lead to significant
                  savings over time. Our AI-powered analysis reveals the most
                  effective strategies.
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>November 15, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Priya Sharma</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Blog Categories */}
        <div className="max-w-5xl mx-auto mb-8">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-gray-800 p-1 w-full flex justify-start overflow-x-auto">
              <TabsTrigger
                value="all"
                className={`${
                  activeTab === "all"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="behavior"
                className={`${
                  activeTab === "behavior"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Behavior Science
              </TabsTrigger>
              <TabsTrigger
                value="savings"
                className={`${
                  activeTab === "savings"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Savings Tips
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className={`${
                  activeTab === "success"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Success Stories
              </TabsTrigger>
              <TabsTrigger
                value="technology"
                className={`${
                  activeTab === "technology"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                AI & Technology
              </TabsTrigger>
            </TabsList>

            {/* All Articles Tab */}
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <BlogCard
                  title="Understanding the Psychology of Impulse Spending"
                  excerpt="Explore the psychological triggers behind impulse purchases and how to overcome them."
                  category="Behavior Science"
                  date="November 12, 2023"
                  readTime="6 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="How AI is Revolutionizing Personal Finance"
                  excerpt="Discover how artificial intelligence is transforming the way we manage money and build habits."
                  category="AI & Technology"
                  date="November 8, 2023"
                  readTime="8 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="The 50/30/20 Rule: Is It Still Relevant?"
                  excerpt="A fresh look at the classic budgeting rule and how it can be adapted for today's financial challenges."
                  category="Savings Tips"
                  date="November 5, 2023"
                  readTime="5 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="From Spender to Saver: Rahul's Journey"
                  excerpt="How one user transformed his financial habits and saved ₹5 lakhs in just one year."
                  category="Success Stories"
                  date="October 30, 2023"
                  readTime="7 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="Behavioral Nudges: Small Prompts, Big Results"
                  excerpt="How subtle nudges can guide you toward better financial decisions without restricting your freedom."
                  category="Behavior Science"
                  date="October 25, 2023"
                  readTime="6 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="The Future of Financial Apps: What's Next?"
                  excerpt="Exploring upcoming trends in fintech and how they'll impact your financial management."
                  category="AI & Technology"
                  date="October 20, 2023"
                  readTime="9 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
              </div>

              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Load More Articles
                </Button>
              </div>
            </TabsContent>

            {/* Other category tabs would have similar content but filtered */}
            <TabsContent value="behavior" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <BlogCard
                  title="Understanding the Psychology of Impulse Spending"
                  excerpt="Explore the psychological triggers behind impulse purchases and how to overcome them."
                  category="Behavior Science"
                  date="November 12, 2023"
                  readTime="6 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="Behavioral Nudges: Small Prompts, Big Results"
                  excerpt="How subtle nudges can guide you toward better financial decisions without restricting your freedom."
                  category="Behavior Science"
                  date="October 25, 2023"
                  readTime="6 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
                <BlogCard
                  title="The Science of Habit Formation in Finance"
                  excerpt="Learn how habits are formed and how to leverage this knowledge for better financial outcomes."
                  category="Behavior Science"
                  date="October 15, 2023"
                  readTime="7 min read"
                  image="/placeholder.svg?height=200&width=300"
                />
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
          </Tabs>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Get the latest articles, tips, and insights delivered straight
                to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-700 border-gray-600 text-white focus-visible:ring-yellow-500"
                />
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ title, excerpt, category, date, readTime, image }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <Badge className="mb-3 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          {category}
        </Badge>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{excerpt}</p>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
