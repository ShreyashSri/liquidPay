"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle, ChevronRight, Search, CreditCard, Building, Wallet, ArrowLeft, Shield } from "lucide-react"

const popularBanks = [
  { id: 1, name: "HDFC Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "ICICI Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "SBI", logo: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Axis Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Kotak Mahindra", logo: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Yes Bank", logo: "/placeholder.svg?height=40&width=40" },
]

const allBanks = [
  ...popularBanks,
  { id: 7, name: "Punjab National Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Bank of Baroda", logo: "/placeholder.svg?height=40&width=40" },
  { id: 9, name: "Canara Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 10, name: "Union Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 11, name: "IndusInd Bank", logo: "/placeholder.svg?height=40&width=40" },
  { id: 12, name: "IDBI Bank", logo: "/placeholder.svg?height=40&width=40" },
]

export default function ConnectBankPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBank, setSelectedBank] = useState(null)
  const [step, setStep] = useState(1)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const filteredBanks = allBanks.filter((bank) => bank.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleBankSelect = (bank) => {
    setSelectedBank(bank)
    setStep(2)
  }

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleConnect = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 2000)
  }

  const handleFinish = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {step > 1 && (
            <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Connect Your Bank</h1>
            <p className="text-gray-400">Securely link your accounts to get personalized financial insights</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-yellow-600 text-black" : "bg-gray-700 text-gray-400"
                }`}
              >
                {step > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? "bg-yellow-600" : "bg-gray-700"}`}></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-yellow-600 text-black" : "bg-gray-700 text-gray-400"
                }`}
              >
                {step > 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? "bg-yellow-600" : "bg-gray-700"}`}></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-yellow-600 text-black" : "bg-gray-700 text-gray-400"
                }`}
              >
                3
              </div>
            </div>
            <div className="hidden md:block">
              <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                <Lock className="h-3.5 w-3.5 mr-1.5" /> Bank-level Security
              </Badge>
            </div>
          </div>

          {step === 1 && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Select Your Bank</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose your bank from the list or search for it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search for your bank..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <Tabs defaultValue="popular">
                  <TabsList className="bg-gray-800 mb-4">
                    <TabsTrigger value="popular">Popular Banks</TabsTrigger>
                    <TabsTrigger value="all">All Banks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="popular" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {popularBanks.map((bank) => (
                        <Card
                          key={bank.id}
                          className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all cursor-pointer"
                          onClick={() => handleBankSelect(bank)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
                                <Image
                                  src={bank.logo || "/placeholder.svg"}
                                  alt={bank.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{bank.name}</h3>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                      {filteredBanks.map((bank) => (
                        <Card
                          key={bank.id}
                          className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all cursor-pointer"
                          onClick={() => handleBankSelect(bank)}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
                                <Image
                                  src={bank.logo || "/placeholder.svg"}
                                  alt={bank.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{bank.name}</h3>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex-col items-start border-t border-gray-800 pt-6">
                <div className="flex items-start mb-4">
                  <Shield className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm">
                    Your credentials are encrypted and never stored. We use read-only access to analyze your
                    transactions.
                  </p>
                </div>
                <div className="flex items-start">
                  <Lock className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm">
                    We use bank-level 256-bit encryption to keep your information safe and secure.
                  </p>
                </div>
              </CardFooter>
            </Card>
          )}

          {step === 2 && selectedBank && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-4 overflow-hidden">
                    <Image
                      src={selectedBank.logo || "/placeholder.svg"}
                      alt={selectedBank.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-white">{selectedBank.name}</CardTitle>
                    <CardDescription className="text-gray-400">Enter your online banking credentials</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300">
                      Username / Customer ID
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleCredentialsChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={handleCredentialsChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-6">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white text-sm font-medium mb-1">Secure Connection</h4>
                        <p className="text-gray-400 text-sm">
                          Your credentials are encrypted and never stored on our servers. We use read-only access to
                          analyze your transactions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? "Connecting..." : "Connect Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-white text-2xl">Connection Successful!</CardTitle>
                <CardDescription className="text-gray-400">
                  Your bank account has been successfully connected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
                      <Image
                        src={selectedBank.logo || "/placeholder.svg"}
                        alt={selectedBank.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{selectedBank.name}</h3>
                      <p className="text-gray-400 text-sm">Connected just now</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 flex items-center">
                        <div className="p-2 rounded-full bg-yellow-500/20 mr-3">
                          <Building className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Checking Account</p>
                          <p className="text-white font-medium">•••• 4567</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 flex items-center">
                        <div className="p-2 rounded-full bg-yellow-500/20 mr-3">
                          <Wallet className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Savings Account</p>
                          <p className="text-white font-medium">•••• 7890</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 flex items-center">
                        <div className="p-2 rounded-full bg-yellow-500/20 mr-3">
                          <CreditCard className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Credit Card</p>
                          <p className="text-white font-medium">•••• 1234</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white text-sm font-medium mb-1">What happens next?</h4>
                        <p className="text-gray-400 text-sm">
                          Our AI will analyze your transaction history to provide personalized insights and
                          recommendations. This process may take a few minutes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-4">
                <Button
                  onClick={handleFinish}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black"
                >
                  Go to Dashboard
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

