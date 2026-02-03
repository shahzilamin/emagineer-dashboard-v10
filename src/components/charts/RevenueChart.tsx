'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/formatters'
import { ChartDataPoint } from '@/types'
import { useTheme } from '@/components/theme/ThemeProvider'

interface RevenueChartProps {
  data: ChartDataPoint[]
  title?: string
  showComparison?: boolean
}

export function RevenueChart({
  data,
  title = 'Revenue Trend',
  showComparison = false,
}: RevenueChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const colors = {
    primary: isDark ? '#3b82f6' : '#2563eb',
    secondary: isDark ? '#64748b' : '#94a3b8',
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#94a3b8' : '#64748b',
    background: isDark ? '#1e293b' : '#ffffff',
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                </linearGradient>
                {showComparison && (
                  <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                  </linearGradient>
                )}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.grid}
                vertical={false}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.text, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.text, fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value, true)}
                dx={-10}
              />
              <Tooltip
                content={<CustomTooltip showComparison={showComparison} />}
              />
              {showComparison && (
                <Area
                  type="monotone"
                  dataKey="previousValue"
                  stroke={colors.secondary}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrevious)"
                  strokeDasharray="5 5"
                />
              )}
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string }>
  label?: string
  showComparison?: boolean
}

function CustomTooltip({ active, payload, label, showComparison }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  const currentValue = payload.find((p) => p.dataKey === 'value')?.value
  const previousValue = payload.find((p) => p.dataKey === 'previousValue')?.value

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-3">
      <p className="text-sm font-medium mb-1">{label}</p>
      {currentValue !== undefined && (
        <p className="text-sm text-primary font-semibold">
          Current: {formatCurrency(currentValue, true)}
        </p>
      )}
      {showComparison && previousValue !== undefined && (
        <p className="text-sm text-muted-foreground">
          Previous: {formatCurrency(previousValue, true)}
        </p>
      )}
    </div>
  )
}
