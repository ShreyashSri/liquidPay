import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Partnerships
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Partner with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              FinSavvy AI
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Join our ecosystem of partners helping to transform financial
            behavior
          </p>
        </div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <PartnerTypeCard
            title="Financial Institutions"
            description="Banks, credit unions, and fintech companies that want to offer behavioral finance tools to their customers."
            icon="/placeholder.svg?height=60&width=60"
          />
          <PartnerTypeCard
            title="Technology Partners"
            description="Technology providers looking to integrate AI-powered financial behavior analysis into their platforms."
            icon="/placeholder.svg?height=60&width=60"
          />
          <PartnerTypeCard
            title="Educational Partners"
            description="Universities, schools, and educational platforms that want to teach financial literacy and behavior."
            icon="/placeholder.svg?height=60&width=60"
          />
        </div>

        {/* Current Partners */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Our Partners
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Companies We Work With
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <PartnerLogo name="HDFC Bank" logo="/banks/HDFC_logo.png" />
            <PartnerLogo
              name="ICICI Bank"
              logo="/placeholder.svg?height=80&width=160"
            />
            <PartnerLogo
              name="Axis Bank"
              logo="/placeholder.svg?height=80&width=160"
            />
            <PartnerLogo
              name="SBI"
              logo="/placeholder.svg?height=80&width=160"
            />
            <PartnerLogo
              name="Razorpay"
              logo="/placeholder.svg?height=80&width=160"
            />
            <PartnerLogo
              name="PhonePe"
              logo="/placeholder.svg?height=80&width=160"
            />
            <PartnerLogo
              name="Zerodha"
              logo="/placeholder.svg?height=80&width=160"
            />
            <PartnerLogo
              name="Groww"
              logo="/placeholder.svg?height=80&width=160"
            />
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Partnership Benefits
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Why partner with FinSavvy AI
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <BenefitItem
                title="Enhanced Customer Value"
                description="Offer your customers powerful tools to improve their financial behavior and build better habits."
              />
              <BenefitItem
                title="Increased Engagement"
                description="Drive higher engagement with gamified savings features and personalized insights."
              />
              <BenefitItem
                title="Data-Driven Insights"
                description="Gain valuable insights into customer financial behavior and preferences."
              />
              <BenefitItem
                title="Competitive Advantage"
                description="Differentiate your offering with cutting-edge AI and behavioral science technology."
              />
              <BenefitItem
                title="Revenue Opportunities"
                description="Create new revenue streams through value-added services and features."
              />
              <BenefitItem
                title="Co-Marketing"
                description="Joint marketing opportunities to reach new audiences and markets."
              />
            </div>
          </div>
        </div>

        {/* Partnership Programs */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Partnership Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProgramCard
              title="API Integration"
              description="Integrate our AI-powered financial behavior analysis directly into your platform via our comprehensive API."
              features={[
                "Full API access",
                "Developer support",
                "Custom integration options",
                "White-label solutions",
              ]}
            />
            <ProgramCard
              title="Referral Program"
              description="Earn commissions by referring customers to FinSavvy AI through our structured referral program."
              features={[
                "Competitive commission rates",
                "Marketing resources",
                "Dedicated partner manager",
                "Performance tracking",
              ]}
            />
            <ProgramCard
              title="Strategic Alliance"
              description="Deep, strategic partnerships with shared goals, joint development, and co-marketing opportunities."
              features={[
                "Joint product development",
                "Co-branded solutions",
                "Shared data insights",
                "Executive sponsorship",
              ]}
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Partner Testimonials
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Integrating FinSavvy AI into our banking app has significantly increased customer engagement and satisfaction. Our users love the personalized insights and gamified savings features."
              name="Rajesh Kumar"
              title="Head of Digital Banking, HDFC Bank"
              company="HDFC Bank"
              logo="/placeholder.svg?height=40&width=40"
            />
            <TestimonialCard
              quote="The API integration was seamless, and the support team was exceptional. Our customers now have access to powerful behavioral finance tools that have measurably improved their saving habits."
              name="Priya Mehta"
              title="CTO"
              company="Groww"
              logo="/placeholder.svg?height=40&width=40"
            />
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Become a Partner
              </CardTitle>
              <CardDescription className="text-gray-400">
                Join our ecosystem of partners and help transform financial
                behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    1. Apply
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Fill out our partner application form
                  </p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    2. Connect
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Meet with our partnership team
                  </p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    3. Launch
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Implement and go live with the integration
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] mx-auto">
                  Apply to Become a Partner{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PartnerTypeCard({ title, description, icon }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden h-full">
      <CardContent className="p-6">
        <div className="flex justify-center mb-4">
          <img
            src={icon || "/placeholder.svg"}
            alt={title}
            className="w-16 h-16 object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white text-center">
          {title}
        </h3>
        <p className="text-gray-400 text-center">{description}</p>
      </CardContent>
    </Card>
  );
}

function PartnerLogo({ name, logo }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center justify-center h-24 hover:border-yellow-500/30 transition-all">
      <img
        src={logo || "/placeholder.svg"}
        alt={name}
        className="max-w-full max-h-full"
      />
    </div>
  );
}

function BenefitItem({ title, description }) {
  return (
    <div className="flex items-start">
      <div className="p-1 rounded-full bg-yellow-500/20 mr-3 mt-1 flex-shrink-0">
        <CheckCircle className="h-5 w-5 text-yellow-500" />
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function ProgramCard({ title, description, features }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden h-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="mt-auto p-6 pt-0">
        <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function TestimonialCard({ quote, name, title, company, logo }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute -top-6 -left-2 text-yellow-500 text-6xl opacity-20">
            "
          </div>
          <p className="text-gray-300 relative z-10 mb-6">{quote}</p>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
            <img
              src={logo || "/placeholder.svg"}
              alt={company}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium">{name}</p>
            <p className="text-gray-400 text-sm">
              {title}, {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
