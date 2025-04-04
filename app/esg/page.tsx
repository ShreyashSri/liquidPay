"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Download, Filter, Leaf, BarChart3, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts"

export default function ESGPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [esgScore, setEsgScore] = useState(0)
  const [environmentalScore, setEnvironmentalScore] = useState(0)
  const [socialScore, setSocialScore] = useState(0)
  const [governanceScore, setGovernanceScore] = useState(0)

  // Animate scores on page load
  useEffect(() => {
    const timer1 = setTimeout(() => setEsgScore(78), 500)
    const timer2 = setTimeout(() => setEnvironmentalScore(85), 800)
    const timer3 = setTimeout(() => setSocialScore(72), 1100)
    const timer4 = setTimeout(() => setGovernanceScore(76), 1400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  // ESG score history data
  const esgHistory = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 67 },
    { month: "Mar", score: 69 },
    { month: "Apr", score: 72 },
    { month: "May", score: 74 },
    { month: "Jun", score: 76 },
    { month: "Jul", score: 78 },
  ]

  // ESG breakdown data
  const esgBreakdown = [
    { category: "Carbon Emissions", score: 92, impact: "high" },
    { category: "Energy Efficiency", score: 85, impact: "high" },
    { category: "Water Management", score: 78, impact: "medium" },
    { category: "Waste Management", score: 82, impact: "medium" },
    { category: "Biodiversity", score: 75, impact: "medium" },
    { category: "Employee Wellbeing", score: 80, impact: "high" },
    { category: "Community Relations", score: 70, impact: "medium" },
    { category: "Corporate Governance", score: 76, impact: "high" },
    { category: "Business Ethics", score: 79, impact: "high" },
  ]

  // Recommendations data
  const recommendations = [
    {
      title: "Increase Renewable Energy Usage",
      description: "Transition to 100% renewable energy sources for operations to improve Environmental score.",
      impact: "high",
      difficulty: "medium",
      category: "environmental",
    },
    {
      title: "Enhance Carbon Offset Portfolio",
      description: "Diversify carbon credit investments to include more nature-based solutions.",
      impact: "high",
      difficulty: "low",
      category: "environmental",
    },
    {
      title: "Improve Supply Chain Transparency",
      description: "Implement blockchain tracking for all supply chain partners to ensure ESG compliance.",
      impact: "medium",
      difficulty: "high",
      category: "governance",
    },
    {
      title: "Expand Community Engagement",
      description: "Develop programs to support local communities affected by climate change.",
      impact: "medium",
      difficulty: "medium",
      category: "social",
    },
    {
      title: "Enhance ESG Reporting",
      description: "Adopt more comprehensive ESG reporting standards aligned with TCFD recommendations.",
      impact: "high",
      difficulty: "medium",
      category: "governance",
    },
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">ESG Scores</h1>
          <p className="text-muted-foreground">
            Monitor and improve your Environmental, Social, and Governance performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ESG Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Overall ESG Score</CardTitle>
            <CardDescription>Your sustainability rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-green-500 stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - esgScore / 100)}`}
                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                  />
                  <text x="50" y="50" className="text-3xl font-bold" dominantBaseline="middle" textAnchor="middle">
                    {esgScore}
                  </text>
                  <text x="50" y="65" className="text-xs" dominantBaseline="middle" textAnchor="middle">
                    out of 100
                  </text>
                </svg>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-4 w-4" />
                <span>+12 points from last quarter</span>
              </div>
              <div className="mt-4 text-center">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Strong Performer
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">ESG Breakdown</CardTitle>
            <CardDescription>Component scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span>Environmental</span>
                  </div>
                  <span className="font-bold">{environmentalScore}/100</span>
                </div>
                <Progress value={environmentalScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Strong performance in carbon reduction and renewable energy usage.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span>Social</span>
                  </div>
                  <span className="font-bold">{socialScore}/100</span>
                </div>
                <Progress value={socialScore} className="h-2 bg-muted [&>div]:bg-blue-600" />
                <p className="text-sm text-muted-foreground">
                  Good employee practices and community engagement initiatives.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span>Governance</span>
                  </div>
                  <span className="font-bold">{governanceScore}/100</span>
                </div>
                <Progress value={governanceScore} className="h-2 bg-muted [&>div]:bg-purple-600" />
                <p className="text-sm text-muted-foreground">
                  Strong board oversight and transparent reporting practices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>ESG Score History</CardTitle>
              <CardDescription>Track your ESG performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={esgHistory} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#scoreGradient)"
                      name="ESG Score"
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#22c55e" }}
                      activeDot={{ r: 6 }}
                      name="ESG Score"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
                <CardDescription>How you compare to industry peers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Your Score</span>
                      <span className="text-sm font-medium">{esgScore}/100</span>
                    </div>
                    <Progress value={esgScore} className="h-3" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Industry Average</span>
                      <span className="text-sm font-medium">68/100</span>
                    </div>
                    <Progress value={68} className="h-3 bg-muted [&>div]:bg-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Top Performer</span>
                      <span className="text-sm font-medium">92/100</span>
                    </div>
                    <Progress value={92} className="h-3 bg-muted [&>div]:bg-purple-600" />
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Your ESG score is <span className="font-medium text-green-600">14.7%</span> above the industry
                      average, placing you in the <span className="font-medium text-green-600">top 25%</span> of
                      performers in your sector.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Carbon Credit Impact</CardTitle>
                <CardDescription>How carbon trading affects your ESG score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">ESG Score Before Carbon Trading</div>
                      <div className="text-2xl font-bold">65/100</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Current ESG Score</div>
                      <div className="text-2xl font-bold">{esgScore}/100</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Improvement from Carbon Trading</div>
                    <Progress value={13} max={100} className="h-3 bg-muted [&>div]:bg-green-600" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>+13 points</span>
                      <span>+20% improvement</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Your participation in carbon credit trading has significantly improved your Environmental score,
                      contributing to a <span className="font-medium text-green-600">20%</span> overall ESG score
                      improvement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Detailed ESG Analysis</CardTitle>
              <CardDescription>Breakdown of all ESG factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {esgBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.category}</span>
                        <Badge
                          variant="outline"
                          className={
                            item.impact === "high"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }
                        >
                          {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
                        </Badge>
                      </div>
                      <span className="font-bold">{item.score}/100</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Poor</span>
                      <span>Average</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        rec.category === "environmental"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : rec.category === "social"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }
                    >
                      {rec.category.charAt(0).toUpperCase() + rec.category.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Impact</div>
                      <Badge
                        variant="outline"
                        className={
                          rec.impact === "high"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }
                      >
                        {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Difficulty</div>
                      <Badge
                        variant="outline"
                        className={
                          rec.difficulty === "low"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : rec.difficulty === "medium"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }
                      >
                        {rec.difficulty.charAt(0).toUpperCase() + rec.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>ESG Reports</CardTitle>
              <CardDescription>Download detailed ESG reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div>
                    <div className="font-medium">Q2 2023 ESG Report</div>
                    <div className="text-sm text-muted-foreground">Comprehensive analysis of your ESG performance</div>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div>
                    <div className="font-medium">Carbon Footprint Analysis</div>
                    <div className="text-sm text-muted-foreground">Detailed breakdown of your carbon emissions</div>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div>
                    <div className="font-medium">Sustainability Roadmap</div>
                    <div className="text-sm text-muted-foreground">Strategic plan for improving ESG performance</div>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div>
                    <div className="font-medium">Industry Benchmark Report</div>
                    <div className="text-sm text-muted-foreground">How you compare to industry peers</div>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

