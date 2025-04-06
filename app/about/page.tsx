import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              FinSavvy AI
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            We're on a mission to transform financial behavior and help young
            adults build better money habits
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-gray-400">
                A world where everyone has the tools and knowledge to make smart
                financial decisions, build wealth, and achieve financial
                freedom.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Our Mission
              </h2>
              <p className="text-gray-400">
                To leverage AI and behavioral science to help young adults
                overcome impulse spending, build savings discipline, and develop
                healthy financial habits that last a lifetime.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Story</h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  The Beginning
                </h3>
                <p className="text-gray-400 mb-4">
                  FinSavvy AI was born out of a personal struggle. Our founder,
                  Rahul, was a young professional who found himself constantly
                  overspending despite having a good income. He realized that
                  traditional budgeting apps weren't addressing the behavioral
                  aspects of spending.
                </p>
                <p className="text-gray-400">
                  In 2020, Rahul teamed up with Priya, an AI specialist, and
                  Vikram, a behavioral economist, to create a solution that
                  would not just track spending but actually help modify
                  financial behavior.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  The Journey
                </h3>
                <p className="text-gray-400 mb-4">
                  The team spent months researching behavioral economics,
                  financial psychology, and AI technologies. They interviewed
                  hundreds of young adults to understand their financial
                  challenges and behaviors.
                </p>
                <p className="text-gray-400">
                  In 2021, they launched the first version of FinSavvy AI with a
                  small group of beta testers. The results were promising –
                  users reported a 30% reduction in impulse spending and a 40%
                  increase in savings within just three months.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 bg-yellow-500/5 w-64 h-64 rounded-full"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-white">Today</h3>
                <p className="text-gray-400 mb-4">
                  Today, FinSavvy AI has grown to a team of 25 passionate
                  individuals across technology, behavioral science, finance,
                  and design. We've helped over 100,000 users improve their
                  financial habits and save collectively more than ₹500 million.
                </p>
                <p className="text-gray-400">
                  Our AI technology continues to evolve, becoming more
                  personalized and effective with each user interaction. We're
                  constantly innovating to find new ways to make financial
                  discipline easier and more rewarding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              title="Innovation"
              description="We constantly push the boundaries of what's possible with AI and behavioral science to create more effective solutions."
            />
            <ValueCard
              title="Empathy"
              description="We understand the emotional aspects of money and design our products with genuine empathy for our users' challenges."
            />
            <ValueCard
              title="Integrity"
              description="We maintain the highest standards of data privacy and security, and we're transparent about how we use AI to help our users."
            />
            <ValueCard
              title="Impact"
              description="We measure our success by the positive change we create in our users' financial lives and the habits they develop."
            />
            <ValueCard
              title="Inclusivity"
              description="We design our products to be accessible and helpful to people from all backgrounds and financial situations."
            />
            <ValueCard
              title="Continuous Learning"
              description="We're committed to constantly learning, improving, and evolving our understanding of financial behavior."
            />
          </div>
        </div>

        {/* Team */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Leadership Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Shreyas Srivastava"
              role="Founder & CEO"
              image="/placeholder.svg?height=150&width=150"
            />
            <TeamMember
              name="Srijit Das"
              role="CTO & AI Lead"
              image="/placeholder.svg?height=150&width=150"
            />
            <TeamMember
              name="Shreysh Omkar Hegde"
              role="Chief Product Officer"
              image="/placeholder.svg?height=150&width=150"
            />
            <TeamMember
              name="Reddy"
              role="Chief Marketing Officer"
              image="/placeholder.svg?height=150&width=150"
            />
            <TeamMember
              name="Jnana Kaustube"
              role="Chief Financial Officer"
              image="/placeholder.svg?height=150&width=150"
            />
            <TeamMember
              name="Vikramjeet Maity"
              role="Chief Behavioral Officer"
              image="/placeholder.svg?height=150&width=150"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Be part of the financial behavior revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 py-6 px-8"
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ title, description }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden h-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}

function TeamMember({ name, role, image }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-700">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
      <p className="text-yellow-500 text-sm">{role}</p>
    </div>
  );
}

function InvestorLogo({ name, logo }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center justify-center h-24">
      <img
        src={logo || "/placeholder.svg"}
        alt={name}
        className="max-w-full max-h-full"
      />
    </div>
  );
}
