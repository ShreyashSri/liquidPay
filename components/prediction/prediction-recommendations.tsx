import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

export function PredictionRecommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Increase Renewable Energy Credits",
      type: "buy",
      confidence: 85,
      reasoning: "Strong price growth expected due to policy changes and increasing corporate demand.",
      timeframe: "Next 30 days",
      targetPrice: "$30.50",
      potentialReturn: "+7.0%",
      risk: "Low",
    },
    {
      id: 2,
      title: "Hold Forest Conservation Credits",
      type: "hold",
      confidence: 72,
      reasoning: "Price volatility expected in the short term, but long-term outlook remains positive.",
      timeframe: "3-6 months",
      targetPrice: "$35.25",
      potentialReturn: "+7.6%",
      risk: "Medium",
    },
    {
      id: 3,
      title: "Reduce Methane Capture Exposure",
      type: "sell",
      confidence: 68,
      reasoning: "Regulatory uncertainty and increasing supply may put downward pressure on prices.",
      timeframe: "Next 30 days",
      targetPrice: "$18.00",
      potentialReturn: "-6.5%",
      risk: "Medium",
    },
  ]

  return (
    <div className="space-y-6">
      {recommendations.map((rec) => (
        <Card key={rec.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{rec.title}</CardTitle>
              <Badge
                variant={rec.type === "buy" ? "default" : rec.type === "sell" ? "destructive" : "outline"}
                className="flex items-center gap-1"
              >
                {rec.type === "buy" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : rec.type === "sell" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <CheckCircle className="h-3 w-3" />
                )}
                <span className="capitalize">{rec.type}</span>
              </Badge>
            </div>
            <CardDescription>{rec.reasoning}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Confidence</div>
                <div className="font-medium">{rec.confidence}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Timeframe</div>
                <div className="font-medium">{rec.timeframe}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Target Price</div>
                <div className="font-medium">{rec.targetPrice}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Potential Return</div>
                <div
                  className={`font-medium ${rec.potentialReturn.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {rec.potentialReturn}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>{rec.risk} Risk</span>
              </Badge>
            </div>

            <div className="flex justify-end">
              <Button className="flex items-center gap-1">
                {rec.type === "buy" ? "Buy Now" : rec.type === "sell" ? "Sell Now" : "View Details"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

