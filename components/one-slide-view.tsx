import { Card } from "@/components/ui/card"
import type { SignalData } from "@/lib/types"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"

interface OneSlideViewProps {
  data: SignalData
  isLoading: boolean
}

export function OneSlideView({ data, isLoading }: OneSlideViewProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-500">Extracting signals from your data...</p>
      </div>
    )
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Executive Summary: {data.weekEnding}</h2>
        <Badge variant="outline" className="text-sm">
          Generated on {new Date().toLocaleDateString()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Key Accomplishments</h3>
          <div className="space-y-2">
            {data.accomplishments.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-amber-50 border-amber-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Critical Blockers</h3>
          <div className="space-y-2">
            {data.blockers.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Next Week Focus</h3>
          <div className="space-y-2">
            {data.nextWeekFocus.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.metrics.map((metric, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{metric.name}</span>
                  {getTrendIcon(metric.trend)}
                </div>
                <span className="text-sm font-bold">
                  {metric.value}
                  {metric.unit && <span className="text-gray-500 ml-1">{metric.unit}</span>}
                </span>
              </div>
              <Progress value={metric.progress} className="h-2" />
              <p className="text-xs text-gray-500">{metric.context}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Executive Summary</h3>
        <p className="text-sm">{data.executiveSummary}</p>
      </Card>
    </div>
  )
}
