import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"

export function PredictionInsights() {
  const predictions = [
    {
      id: 1,
      creditType: "Renewable Energy",
      currentPrice: 28.5,
      predictedPrice: 32.75,
      confidence: 85,
      timeframe: "30 days",
      factors: ["Policy changes", "Increased demand", "Supply constraints"],
    },
    {
      id: 2,
      creditType: "Forest Conservation",
      currentPrice: 32.75,
      predictedPrice: 30.25,
      confidence: 72,
      timeframe: "30 days",
      factors: ["Regulatory uncertainty", "Market saturation", "New project delays"],
    },
    {
      id: 3,
      creditType: "Methane Capture",
      currentPrice: 19.25,
      predictedPrice: 24.5,
      confidence: 78,
      timeframe: "30 days",
      factors: ["New technology adoption", "Industrial sector growth", "Stricter emissions standards"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Prediction Insights</CardTitle>
        <CardDescription>Market forecasts for the next 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{prediction.creditType}</h3>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                >
                  {prediction.confidence}% Confidence
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="text-xl font-bold">${prediction.currentPrice.toFixed(2)}</div>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />

                <div>
                  <div className="text-sm text-muted-foreground">Predicted Price</div>
                  <div className="text-xl font-bold flex items-center gap-1">
                    ${prediction.predictedPrice.toFixed(2)}
                    {prediction.predictedPrice > prediction.currentPrice ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>

                <div className="ml-auto">
                  <div className="text-sm text-muted-foreground">Change</div>
                  <div
                    className={`text-xl font-bold ${prediction.predictedPrice > prediction.currentPrice ? "text-green-600" : "text-red-600"}`}
                  >
                    {(((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice) * 100).toFixed(
                      1,
                    )}
                    %
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Key Factors</div>
                <div className="flex flex-wrap gap-2">
                  {prediction.factors.map((factor, index) => (
                    <Badge key={index} variant="secondary">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

