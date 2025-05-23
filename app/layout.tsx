import { ReactNode } from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientProviders from "@/components/client-providers"
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "LiquidPay - Financial Behavior Modification",
  description:
    "AI-powered financial assistant that helps young adults curb impulse spending and build savings discipline",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-black text-white">
        <ClientProviders>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ClientProviders>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}



import './globals.css'