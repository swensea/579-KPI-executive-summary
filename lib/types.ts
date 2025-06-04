export interface Metric {
  name: string
  value: string | number
  unit?: string
  progress: number
  trend: number // positive for up, negative for down, 0 for neutral
  context: string
}

export interface SignalData {
  weekEnding: string
  executiveSummary: string
  accomplishments: string[]
  blockers: string[]
  nextWeekFocus: string[]
  metrics: Metric[]
}
