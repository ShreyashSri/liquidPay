"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, Leaf, LineChart, Repeat, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import { HeroStats } from "@/components/home/hero-stats"
import { FeatureCard } from "@/components/home/feature-card"
import { TestimonialCard } from "@/components/home/testimonial-card"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ParticleBackground } from "@/components/effects/particle-background"

// Dynamically import the 3D model component with no SSR
const CarbonModel = dynamic(() => import("@/components/3d/carbon-model"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="p-8 rounded-full bg-green-100 dark:bg-green-900/30">
        <Leaf className="h-20 w-20 text-green-600 dark:text-green-400 animate-pulse-slow" />
      </div>
    </div>
  ),
})

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Add active class to elements for scroll reveal
      const reveals = document.querySelectorAll(".reveal-on-scroll")
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("active")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  }

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden hero-gradient min-h-[90vh] flex items-center">
        {isMounted && <ParticleBackground />}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200 dark:bg-emerald-900/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
            <div className="inline-block mb-6 animate-fade-in">
              <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Leaf className="h-4 w-4" />
                <span>Revolutionizing Carbon Trading</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
                Trade Carbon Credits with <br className="hidden md:block" />
                Blockchain & AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 animate-slide-up stagger-1">
              CarbonBid combines blockchain technology with AI-powered forecasting to create a transparent, efficient
              marketplace for carbon credit trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up stagger-2">
              <Button size="lg" className="button-gradient">
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" className="glow-effect">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 h-[500px] relative animate-fade-in">
            {isMounted && <CarbonModel scrollY={scrollY} />}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-indicator-text">Scroll to explore</div>
          <div className="scroll-indicator-arrow">
            <ArrowRight className="h-4 w-4 rotate-90" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 reveal-on-scroll">
        <HeroStats />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly features to make carbon credit trading
            accessible and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="reveal-on-scroll">
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-green-600" />}
              title="AI-Powered Forecasting"
              description="Leverage machine learning to predict market trends and optimize your trading strategy."
            />
          </div>
          <div className="reveal-on-scroll stagger-1">
            <FeatureCard
              icon={<Repeat className="h-10 w-10 text-green-600" />}
              title="P2P Carbon Exchange"
              description="Trade directly with other companies without intermediaries, reducing costs and increasing efficiency."
            />
          </div>
          <div className="reveal-on-scroll stagger-2">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-600" />}
              title="Secure Tokenization"
              description="Convert carbon credits into secure, tradable tokens on the blockchain."
            />
          </div>
          <div className="reveal-on-scroll">
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-green-600" />}
              title="Dynamic Pricing"
              description="Real-time price adjustments based on market demand and emission trends."
            />
          </div>
          <div className="reveal-on-scroll stagger-1">
            <FeatureCard
              icon={<LineChart className="h-10 w-10 text-green-600" />}
              title="ESG Score Integration"
              description="Boost your company's ESG score through active participation in carbon trading."
            />
          </div>
          <div className="reveal-on-scroll stagger-2">
            <FeatureCard
              icon={<Leaf className="h-10 w-10 text-green-600" />}
              title="Yield Farming"
              description="Stake unused carbon credits to earn rewards and maximize your assets."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50/80 dark:bg-slate-900/50 py-20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what companies are saying about their experience with CarbonBid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="reveal-on-scroll">
              <TestimonialCard
                quote="CarbonBid has transformed how we manage our carbon credits. The AI forecasting is incredibly accurate."
                author="Sarah Johnson"
                role="Sustainability Director"
                company="GreenTech Industries"
              />
            </div>
            <div className="reveal-on-scroll stagger-1">
              <TestimonialCard
                quote="The tokenization process is seamless, and the trading platform is intuitive. A game-changer for our ESG goals."
                author="Michael Chen"
                role="Chief Strategy Officer"
                company="EcoSolutions Corp"
              />
            </div>
            <div className="reveal-on-scroll stagger-2">
              <TestimonialCard
                quote="We've seen a 40% increase in trading efficiency since switching to CarbonBid. The yield farming feature is brilliant."
                author="Jessica Williams"
                role="Head of Sustainability"
                company="Future Energy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 reveal-on-scroll">
        <Card className="border-0 glass-card">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                  Ready to revolutionize your carbon trading?
                </h3>
                <p className="text-muted-foreground mb-6 md:mb-0 max-w-xl">
                  Join the platform that's setting new standards in carbon credit trading with blockchain technology and
                  AI-powered insights.
                </p>
              </div>
              <Button size="lg" className="button-gradient">
                <Link href="/marketplace" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Scroll progress indicator */}
      {isMounted && (
        <div
          className="scroll-progress"
          style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
        ></div>
      )}
    </div>
  )
}

