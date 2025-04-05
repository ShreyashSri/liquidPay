"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { useState } from "react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden border-0 shadow-md transition-all duration-300 glass-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/20 dark:to-transparent transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        <Quote
          className={`h-8 w-8 text-green-600/20 mb-4 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
        />

        <p className="text-muted-foreground mb-6 relative z-10">{quote}</p>

        <div className="flex items-center gap-4 relative z-10">
          <Avatar className="border-2 border-green-100 dark:border-green-900/50">
            <AvatarFallback className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
              {author
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">
              {role}, {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

