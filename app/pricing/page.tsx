"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X, Sparkles } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your financial journey. All plans include
            our core AI features.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <span
              className={`text-sm ${
                billingCycle === "monthly"
                  ? "text-white font-medium"
                  : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            <div className="flex items-center">
              <Switch
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) =>
                  setBillingCycle(checked ? "yearly" : "monthly")
                }
                className="data-[state=checked]:bg-yellow-600"
              />
            </div>
            <div className="flex items-center">
              <span
                className={`text-sm ${
                  billingCycle === "yearly"
                    ? "text-white font-medium"
                    : "text-gray-400"
                }`}
              >
                Yearly
              </span>
              <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-gray-600 to-gray-500"></div>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Basic</CardTitle>
              <CardDescription className="text-gray-400">
                Get started with essential features
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">₹0</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <PricingFeature included>Basic spending analytics</PricingFeature>
              <PricingFeature included>
                Connect up to 2 bank accounts
              </PricingFeature>
              <PricingFeature included>
                Monthly financial summary
              </PricingFeature>
              <PricingFeature included>Basic savings goals</PricingFeature>
              <PricingFeature>Advanced AI insights</PricingFeature>
              <PricingFeature>Real-time nudges</PricingFeature>
              <PricingFeature>Behavioral analysis</PricingFeature>
              <PricingFeature>Gamified savings</PricingFeature>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/50 transition-all overflow-hidden shadow-[0_0_15px_rgba(234,179,8,0.2)] relative md:scale-105 z-10">
            <div className="absolute top-0 right-0">
              <Badge className="m-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Most Popular
              </Badge>
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Pro</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced features for serious savers
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === "monthly" ? "₹499" : "₹399"}
                </span>
                <span className="text-gray-400 ml-2">/ month</span>
                {billingCycle === "yearly" && (
                  <div className="text-sm text-green-400 mt-1">
                    Billed annually (₹4,788)
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <PricingFeature included>Everything in Basic</PricingFeature>
              <PricingFeature included>
                Connect unlimited bank accounts
              </PricingFeature>
              <PricingFeature included>Advanced AI insights</PricingFeature>
              <PricingFeature included>Real-time nudges</PricingFeature>
              <PricingFeature included>Behavioral analysis</PricingFeature>
              <PricingFeature included>Gamified savings</PricingFeature>
              <PricingFeature>Priority support</PricingFeature>
              <PricingFeature>Custom financial coaching</PricingFeature>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                Get Pro
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 to-purple-400"></div>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Premium</CardTitle>
              <CardDescription className="text-gray-400">
                Complete financial transformation
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === "monthly" ? "₹999" : "₹799"}
                </span>
                <span className="text-gray-400 ml-2">/ month</span>
                {billingCycle === "yearly" && (
                  <div className="text-sm text-green-400 mt-1">
                    Billed annually (₹9,588)
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <PricingFeature included>Everything in Pro</PricingFeature>
              <PricingFeature included>Priority support</PricingFeature>
              <PricingFeature included>
                Custom financial coaching
              </PricingFeature>
              <PricingFeature included>
                Advanced investment tracking
              </PricingFeature>
              <PricingFeature included>
                Family account sharing (up to 5)
              </PricingFeature>
              <PricingFeature included>
                Exclusive financial webinars
              </PricingFeature>
              <PricingFeature included>
                Tax optimization insights
              </PricingFeature>
              <PricingFeature included>
                Dedicated account manager
              </PricingFeature>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white">
                Get Premium
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Compare Features
            </h2>
            <p className="text-xl text-gray-400">
              Detailed breakdown of what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">
                    Feature
                  </th>
                  <th className="py-4 px-6 text-center text-gray-400 font-medium">
                    Basic
                  </th>
                  <th className="py-4 px-6 text-center text-yellow-400 font-medium">
                    Pro
                  </th>
                  <th className="py-4 px-6 text-center text-purple-400 font-medium">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  feature="Bank Connections"
                  basic="2 accounts"
                  pro="Unlimited"
                  premium="Unlimited"
                />
                <ComparisonRow
                  feature="AI-Powered Insights"
                  basic="Basic"
                  pro="Advanced"
                  premium="Advanced+"
                />
                <ComparisonRow
                  feature="Real-time Nudges"
                  basic={false}
                  pro="5 per day"
                  premium="Unlimited"
                />
                <ComparisonRow
                  feature="Behavioral Analysis"
                  basic={false}
                  pro="Monthly"
                  premium="Weekly"
                />
                <ComparisonRow
                  feature="Gamified Savings"
                  basic={false}
                  pro="Basic"
                  premium="Advanced"
                />
                <ComparisonRow
                  feature="Financial Coaching"
                  basic={false}
                  pro={false}
                  premium="Monthly"
                />
                <ComparisonRow
                  feature="Family Accounts"
                  basic={false}
                  pro={false}
                  premium="Up to 5"
                />
                <ComparisonRow
                  feature="Support"
                  basic="Email"
                  pro="Priority Email"
                  premium="Dedicated Manager"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <FaqItem
              question="Can I change plans later?"
              answer="Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
            />
            <FaqItem
              question="Is there a free trial for paid plans?"
              answer="Yes, we offer a 14-day free trial for both our Pro and Premium plans. No credit card is required to start your trial."
            />
            <FaqItem
              question="How secure is my financial data?"
              answer="We use bank-level 256-bit encryption to secure your data. We never store your bank credentials, and we use read-only access to analyze your transactions. Your security is our top priority."
            />
            <FaqItem
              question="Can I cancel my subscription anytime?"
              answer="Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to your paid features until the end of your current billing cycle."
            />
            <FaqItem
              question="Do you offer discounts for students?"
              answer="Yes, we offer a 50% discount on our Pro plan for verified students. Contact our support team with your student ID to apply for the discount."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Still have questions?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Our team is here to help you find the perfect plan for your
                financial journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
                  Contact Sales
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingFeature({ children, included = false }) {
  return (
    <div className="flex items-center">
      {included ? (
        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
      )}
      <span className={included ? "text-gray-300" : "text-gray-500"}>
        {children}
      </span>
    </div>
  );
}

function ComparisonRow({ feature, basic, pro, premium }) {
  return (
    <tr className="border-b border-gray-700">
      <td className="py-4 px-6 text-left text-white">{feature}</td>
      <td className="py-4 px-6 text-center text-gray-400">
        {basic === false ? (
          <X className="h-5 w-5 text-gray-500 mx-auto" />
        ) : (
          basic
        )}
      </td>
      <td className="py-4 px-6 text-center text-gray-400">
        {pro === false ? (
          <X className="h-5 w-5 text-gray-500 mx-auto" />
        ) : (
          <span className="text-yellow-400">{pro}</span>
        )}
      </td>
      <td className="py-4 px-6 text-center text-gray-400">
        {premium === false ? (
          <X className="h-5 w-5 text-gray-500 mx-auto" />
        ) : (
          <span className="text-purple-400">{premium}</span>
        )}
      </td>
    </tr>
  );
}

function FaqItem({ question, answer }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-3 text-white">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
}
