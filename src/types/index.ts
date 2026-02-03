export type TimePeriod = 'today' | 'wtd' | 'mtd' | 'qtd' | 'ytd'

export type BusinessUnit = 'wellbefore' | 'd2c-builders'

export type MetricStatus = 'success' | 'warning' | 'danger'

export type TrendDirection = 'up' | 'down' | 'flat'

export interface SparklineData {
  value: number
  date: string
}

export interface MetricGoal {
  target: number
  current: number
  label: string
}

export interface MetricTarget {
  min?: number
  max?: number
  optimal?: number
}

export interface Metric {
  id: string
  label: string
  value: number
  previousValue?: number
  format: 'currency' | 'percent' | 'number' | 'ratio' | 'time' | 'months'
  trend?: TrendDirection
  change?: number
  changeFormatted?: string
  status?: MetricStatus
  target?: MetricTarget
  goal?: MetricGoal
  sparkline?: SparklineData[]
  higherIsBetter?: boolean
  description?: string
}

export interface DrilldownBreakdown {
  label: string
  value: number
  percentage: number
  change?: number
}

export interface ProductBreakdown extends DrilldownBreakdown {
  sku?: string
  category?: string
}

export interface ChannelBreakdown extends DrilldownBreakdown {
  channel: string
}

export interface TimeBreakdown extends DrilldownBreakdown {
  period: string
  date: string
}

export interface MetricDrilldown {
  metricId: string
  metricLabel: string
  totalValue: number
  byProduct?: ProductBreakdown[]
  byChannel?: ChannelBreakdown[]
  byTime?: TimeBreakdown[]
}

export interface DashboardData {
  businessUnit: BusinessUnit
  timePeriod: TimePeriod
  lastUpdated: string
  metrics: Metric[]
  drilldowns: Record<string, MetricDrilldown>
}

export interface ChartDataPoint {
  date: string
  label: string
  value: number
  previousValue?: number
}

export interface ComparisonData {
  current: {
    label: string
    value: number
    data: ChartDataPoint[]
  }
  previous: {
    label: string
    value: number
    data: ChartDataPoint[]
  }
}

export interface ExportOptions {
  format: 'pdf' | 'csv'
  includeCharts: boolean
  dateRange: string
  businessUnit: BusinessUnit
}

export interface CommandAction {
  id: string
  label: string
  shortcut?: string
  icon?: string
  category: 'navigation' | 'actions' | 'settings'
  action: () => void
}
