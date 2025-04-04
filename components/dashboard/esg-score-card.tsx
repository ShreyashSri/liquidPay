import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight } from "lucide-react"

export function ESGScoreCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">ESG Score</CardTitle>
        <CardDescription>Your environmental impact rating</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">78/100</div>
        <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
          <ArrowUpRight className="h-4 w-4" />
          <span>+12 points from last quarter</span>
        </div>
        <Progress value={78} className="h-2 mt-4" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Poor</span>
          <span>Average</span>
          <span>Excellent</span>
        </div>
      </CardContent>
    </Card>
  )
}

