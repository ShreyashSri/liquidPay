"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, Building, ArrowUpRight, MessageSquare, UserPlus } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import the NetworkVisualization component with no SSR
const NetworkVisualization = dynamic(() => import("@/components/network/network-visualization"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center border rounded-lg">
      <div className="loading-spinner"></div>
    </div>
  ),
})

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState("connections")
  const [searchTerm, setSearchTerm] = useState("")

  // Network data
  const connections = [
    {
      id: 1,
      name: "EcoSolutions Corp",
      type: "Corporation",
      industry: "Renewable Energy",
      location: "California, USA",
      status: "active",
      lastTransaction: "2023-06-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Green Investments Ltd",
      type: "Financial Institution",
      industry: "Investment Banking",
      location: "London, UK",
      status: "active",
      lastTransaction: "2023-06-14",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "CleanAir Technologies",
      type: "Corporation",
      industry: "Clean Technology",
      location: "Berlin, Germany",
      status: "active",
      lastTransaction: "2023-06-12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sustainable Future Inc",
      type: "Corporation",
      industry: "Sustainable Agriculture",
      location: "Toronto, Canada",
      status: "pending",
      lastTransaction: null,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "GreenEarth Partners",
      type: "Non-Profit",
      industry: "Conservation",
      location: "Nairobi, Kenya",
      status: "active",
      lastTransaction: "2023-06-08",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Carbon Capture Alliance",
      type: "Consortium",
      industry: "Carbon Capture",
      location: "Oslo, Norway",
      status: "pending",
      lastTransaction: null,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter connections based on search term
  const filteredConnections = connections.filter(
    (conn) =>
      conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Network</h1>
          <p className="text-muted-foreground">Connect and trade with partners in the carbon marketplace</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search network..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Connections</span>
                <span className="text-2xl font-bold">{connections.length}</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+2 new connections this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Active Partners</span>
                <span className="text-2xl font-bold">{connections.filter((c) => c.status === "active").length}</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+15% trading volume with partners</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Pending Requests</span>
                <span className="text-2xl font-bold">{connections.filter((c) => c.status === "pending").length}</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-amber-600 dark:text-amber-400">
              <span>Awaiting approval</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="visualization">Network Visualization</TabsTrigger>
          <TabsTrigger value="discover">Discover Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Network</CardTitle>
              <CardDescription>Manage your trading partners and connections</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredConnections.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No connections found matching your search.</p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredConnections.map((connection) => (
                    <div
                      key={connection.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback>
                            {connection.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{connection.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {connection.industry} • {connection.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            connection.status === "active"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }
                        >
                          {connection.status === "active" ? "Active" : "Pending"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="button-gradient">
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Network Visualization</CardTitle>
              <CardDescription>Interactive view of your trading network</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTab === "visualization" && <NetworkVisualization connections={connections} />}
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Drag nodes to rearrange the network visualization. Hover over nodes for more information.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Discover Partners</CardTitle>
              <CardDescription>Find new trading partners based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">SustainableCorp Inc</div>
                      <div className="text-sm text-muted-foreground">Renewable Energy • Singapore</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                      98% Match
                    </Badge>
                    <Button size="sm" className="button-gradient">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>GF</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Green Futures Ltd</div>
                      <div className="text-sm text-muted-foreground">Carbon Capture • Australia</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                      92% Match
                    </Badge>
                    <Button size="sm" className="button-gradient">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">EcoCapital Investments</div>
                      <div className="text-sm text-muted-foreground">Financial Services • Switzerland</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      85% Match
                    </Badge>
                    <Button size="sm" className="button-gradient">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>RF</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Rainforest Alliance</div>
                      <div className="text-sm text-muted-foreground">Conservation • Brazil</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      80% Match
                    </Badge>
                    <Button size="sm" className="button-gradient">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

