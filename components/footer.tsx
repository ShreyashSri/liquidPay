import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotButton from "@/components/chatbot-button";

const footerLinks = {
  features: [
    { name: "AI Features", href: "/features" },
    { name: "Behavior Analysis", href: "/behavior-analysis" },
    { name: "Savings Automation", href: "/savings" },
    { name: "Real-time Nudges", href: "/nudges" },
    { name: "Gamified Savings", href: "/gamified" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Security", href: "/security" },
    { name: "Compliance", href: "/compliance" },
  ],
  resources: [
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Developers", href: "/developers" },
    { name: "API Documentation", href: "/api-docs" },
    { name: "Partners", href: "/partners" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 pt-16 pb-8 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,192,192,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-yellow-400"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v1" />
                <path d="M12 21v1" />
                <path d="M4.93 4.93l.7.7" />
                <path d="M18.36 18.36l.7.7" />
                <path d="M2 12h1" />
                <path d="M21 12h1" />
                <path d="M4.93 19.07l.7-.7" />
                <path d="M18.36 5.64l.7-.7" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span className="text-xl font-bold text-white">Liquidpay</span>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered financial assistant for better spending habits and
              savings discipline. Transform your financial behavior with
              personalized insights and real-time nudges.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                  Get Started
                </Button>
              </Link>
              <Link href="/connect-bank">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Connect Bank
                </Button>
              </Link>
            </div>

            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Features</h3>
            <ul className="space-y-4">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/legal"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Liquidpay. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChatbotButton />
    </footer>
  );
}
