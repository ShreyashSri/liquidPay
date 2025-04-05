"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BarChart3, Briefcase, CreditCard, Home, Leaf, LineChart, Menu, ShoppingCart, Users } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Marketplace",
      icon: ShoppingCart,
      href: "/marketplace",
      active: pathname === "/marketplace",
    },
    {
      label: "Portfolio",
      icon: Briefcase,
      href: "/portfolio",
      active: pathname === "/portfolio",
    },
    {
      label: "Predictions",
      icon: LineChart,
      href: "/prediction",
      active: pathname === "/prediction",
    },
    {
      label: "Transactions",
      icon: CreditCard,
      href: "/transactions",
      active: pathname === "/transactions",
    },
    {
      label: "ESG Scores",
      icon: Leaf,
      href: "/esg",
      active: pathname === "/esg",
    },
    {
      label: "Network",
      icon: Users,
      href: "/network",
      active: pathname === "/network",
    },
  ]

  const SidebarContent = (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl gradient-text">CarbonBid</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4 custom-scrollbar">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                route.active
                  ? "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-50"
                  : "hover:bg-green-50 hover:text-green-900 dark:hover:bg-green-900/20 dark:hover:text-green-50",
              )}
            >
              <route.icon
                className={cn("h-5 w-5", route.active ? "text-green-600 dark:text-green-400" : "text-muted-foreground")}
              />
              {route.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-50 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return <aside className="hidden w-64 border-r md:block">{SidebarContent}</aside>
}

