"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

export function HistoricalView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentIndex, setCurrentIndex] = useState(0)

  const mockHistoricalDates = ["May 31, 2025", "May 24, 2025", "May 17, 2025", "May 10, 2025", "May 3, 2025"]

  const handlePrevious = () => {
    setCurrentIndex(Math.min(currentIndex + 1, mockHistoricalDates.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Historical Updates</h2>

        <div className="flex items-center gap-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentIndex >= mockHistoricalDates.length - 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="font-medium">{mockHistoricalDates[currentIndex]}</div>

        <Button variant="outline" size="icon" onClick={handleNext} disabled={currentIndex <= 0}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="p-6 bg-gray-50 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Historical data visualization will appear here</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Engagement Metrics</h3>
          <p className="text-sm">Track which updates leadership actually viewed and engaged with</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Trend Analysis</h3>
          <p className="text-sm">See how key metrics have evolved over time</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Pattern Recognition</h3>
          <p className="text-sm">Identify recurring blockers and systemic issues</p>
        </Card>
      </div>
    </div>
  )
}
