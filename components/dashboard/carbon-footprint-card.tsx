import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDownRight } from "lucide-react"

export function CarbonFootprintCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Carbon Footprint</CardTitle>
        <CardDescription>Your emissions reduction progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">-32%</div>
        <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
          <ArrowDownRight className="h-4 w-4" />
          <span>-8% from last year</span>
        </div>
        <Progress value={68} className="h-2 mt-4" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Target: -40%</span>
          <span>Current: -32%</span>
        </div>
      </CardContent>
    </Card>
  )
}

