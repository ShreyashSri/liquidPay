import { Shield, TrendingUp, Zap, Award } from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="h-10 w-10 text-yellow-400" />,
    title: "Behavior Analysis",
    description:
      "Advanced AI algorithms analyze your spending patterns to identify areas for improvement and savings opportunities.",
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-400" />,
    title: "Real-time Nudges",
    description:
      "Receive personalized notifications that help you make better financial decisions in the moment.",
  },
  {
    icon: <Shield className="h-10 w-10 text-yellow-400" />,
    title: "Secure Encryption",
    description:
      "End-to-end encryption ensures your financial data remains private and protected at all times.",
  },
  {
    icon: <Award className="h-10 w-10 text-yellow-400" />,
    title: "Gamified Savings",
    description:
      "Earn rewards and unlock achievements as you build better financial habits and reach your savings goals.",
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            AI-Powered Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our intelligent platform uses cutting-edge AI to transform your
            financial behavior
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-8 transition-all hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
