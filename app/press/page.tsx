import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Calendar,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Press Room
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            FinSavvy AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              in the News
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Latest news, press releases, and media resources
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
              Press Kit <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Media Inquiries
            </Button>
          </div>
        </div>

        {/* Latest Press Release */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Press Release"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  Latest Press Release
                </Badge>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  FinSavvy AI Raises $15 Million to Expand AI-Powered Financial
                  Behavior Platform
                </h2>
                <p className="text-gray-400 mb-6">
                  Funding will accelerate product development and international
                  expansion to help more young adults build better financial
                  habits.
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>November 10, 2023</span>
                </div>
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                  Read Full Release <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Press Releases */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Press Releases
            </h2>
          </div>

          <div className="space-y-6">
            <PressReleaseItem
              title="FinSavvy AI Launches Gamified Savings Feature to Help Young Adults Save More"
              date="October 15, 2023"
              excerpt="New feature uses behavioral science and game mechanics to make saving money more engaging and rewarding."
            />
            <PressReleaseItem
              title="FinSavvy AI Partners with HDFC Bank to Offer Behavioral Finance Tools"
              date="September 22, 2023"
              excerpt="Strategic partnership will bring AI-powered financial behavior analysis to millions of HDFC Bank customers."
            />
            <PressReleaseItem
              title="FinSavvy AI Reaches 100,000 User Milestone"
              date="August 5, 2023"
              excerpt="Platform has helped users collectively save over ₹500 million through behavioral insights and real-time nudges."
            />
            <PressReleaseItem
              title="FinSavvy AI Introduces Advanced Behavioral Analysis Dashboard"
              date="July 12, 2023"
              excerpt="New dashboard provides deeper insights into spending patterns and financial behavior triggers."
            />
            <PressReleaseItem
              title="FinSavvy AI Expands Leadership Team with Key Hires"
              date="June 8, 2023"
              excerpt="Company adds experienced executives in product, marketing, and AI to accelerate growth and innovation."
            />
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              View All Press Releases
            </Button>
          </div>
        </div>

        {/* Media Coverage */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Media Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MediaCoverageCard
              title="How FinSavvy AI is Changing Financial Behavior"
              publication="Economic Times"
              date="November 5, 2023"
              image="/placeholder.svg?height=60&width=120"
            />
            <MediaCoverageCard
              title="The Rise of Behavioral Finance Apps"
              publication="TechCrunch"
              date="October 28, 2023"
              image="/placeholder.svg?height=60&width=120"
            />
            <MediaCoverageCard
              title="FinSavvy AI: The Future of Personal Finance"
              publication="Forbes India"
              date="October 15, 2023"
              image="/placeholder.svg?height=60&width=120"
            />
            <MediaCoverageCard
              title="How AI is Helping Young Adults Save More"
              publication="Mint"
              date="September 30, 2023"
              image="/placeholder.svg?height=60&width=120"
            />
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              View All Media Coverage
            </Button>
          </div>
        </div>

        {/* Brand Assets */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Brand Assets</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Download official logos, screenshots, and other brand assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AssetCard
              title="Logo Package"
              description="Download our logo in various formats and sizes"
              image="/placeholder.svg?height=150&width=150"
            />
            <AssetCard
              title="Product Screenshots"
              description="High-resolution screenshots of our platform"
              image="/placeholder.svg?height=150&width=150"
            />
            <AssetCard
              title="Brand Guidelines"
              description="Official brand colors, typography, and usage guidelines"
              image="/placeholder.svg?height=150&width=150"
            />
          </div>
        </div>

        {/* Media Contact */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Media Contact
              </CardTitle>
              <CardDescription className="text-gray-400">
                For press inquiries, interview requests, and other media
                opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <p className="text-white font-medium">Media Relations Team</p>
                <p className="text-gray-400">press@finsavvy.ai</p>
                <p className="text-gray-400">+91 98765 43210</p>
              </div>

              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
                Contact Media Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PressReleaseItem({ title, date, excerpt }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{excerpt}</p>
        <Button
          variant="ghost"
          className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 p-0"
        >
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function MediaCoverageCard({ title, publication, date, image }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <img
            src={image || "/placeholder.svg"}
            alt={publication}
            className="h-8 object-contain"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-sm">
            <Globe className="h-4 w-4 mr-1" />
            <span>{publication}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <Button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white">
          Read Article <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function AssetCard({ title, description, image }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <Button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </CardContent>
    </Card>
  );
}
