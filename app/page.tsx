import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, CreditCard, Brain, BarChart3 } from "lucide-react"
import HeroScene from "@/components/hero-scene"
import FeatureSection from "@/components/feature-section"
import SpendingInsights from "@/components/spending-insights"
import SavingsGoals from "@/components/savings-goals"
import Testimonials from "@/components/testimonials"
import ScrollDownIndicator from "@/components/scroll-down-indicator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BankIntegration from "@/components/bank-integration"
import BehaviorInsights from "@/components/behavior-insights"
import AiFeatureShowcase from "@/components/ai-feature-showcase"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full h-screen relative flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black z-[1]"></div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-sm py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> AI-Powered Financial Assistant
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Reshape Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-yellow-300 to-gray-400">
                Financial Behavior
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our AI-powered assistant helps young adults curb impulse spending and build savings discipline through
              personalized real-time nudges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                >
                  Start Saving Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <ScrollDownIndicator />
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-32 right-10 z-10 hidden lg:block">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-lg p-4 shadow-xl">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-yellow-500" />
              <span className="text-white font-medium">Success Rate</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">87%</div>
            <p className="text-gray-400 text-sm">Users improved savings</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">Simple Process</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">How FinSavvy AI Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your financial habits in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
              <div className="absolute -right-6 -top-6 bg-yellow-500/10 w-24 h-24 rounded-full"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Connect Your Accounts</h3>
                <p className="text-gray-400">
                  Securely link your bank accounts and credit cards to get a complete view of your finances.
                </p>
                <Link href="/connect-bank">
                  <Button variant="link" className="p-0 h-auto mt-4 text-yellow-500 hover:text-yellow-400">
                    Connect Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
              <div className="absolute -right-6 -top-6 bg-yellow-500/10 w-24 h-24 rounded-full"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Get AI Analysis</h3>
                <p className="text-gray-400">
                  Our AI analyzes your spending patterns and identifies opportunities to save and improve habits.
                </p>
                <Link href="/behavior-analysis">
                  <Button variant="link" className="p-0 h-auto mt-4 text-yellow-500 hover:text-yellow-400">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
              <div className="absolute -right-6 -top-6 bg-yellow-500/10 w-24 h-24 rounded-full"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Receive Smart Nudges</h3>
                <p className="text-gray-400">
                  Get personalized notifications that help you make better financial decisions in real-time.
                </p>
                <Link href="/nudges">
                  <Button variant="link" className="p-0 h-auto mt-4 text-yellow-500 hover:text-yellow-400">
                    See Examples <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Integration Section */}
      <BankIntegration />

      {/* AI Features Section */}
      <FeatureSection />

      {/* Behavior Insights Section */}
      <BehaviorInsights />

      {/* Spending Insights Section */}
      <SpendingInsights />

      {/* AI Feature Showcase */}
      <AiFeatureShowcase />

      {/* Savings Goals Section */}
      <SavingsGoals />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.1),transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,192,192,0.1),transparent_40%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Limited Time Offer</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Start Your Financial Transformation Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of young adults who have already improved their financial habits with FinSavvy AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                >
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-gray-400 mt-6">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

