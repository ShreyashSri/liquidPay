import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientProviders from "@/components/client-providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LiquidPay - Financial Behavior Modification",
  description:
    "AI-powered financial assistant that helps young adults curb impulse spending and build savings discipline",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ClientProviders>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  )
}



import './globals.css'