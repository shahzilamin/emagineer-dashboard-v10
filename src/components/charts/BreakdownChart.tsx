'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { useTheme } from '@/components/theme/ThemeProvider'

interface BreakdownDataPoint {
  label: string
  value: number
  percentage?: number
  change?: number
}

interface BreakdownChartProps {
  data: BreakdownDataPoint[]
  format?: 'currency' | 'percent' | 'number'
  showPercentage?: boolean
  horizontal?: boolean
}

export function BreakdownChart({
  data,
  format = 'currency',
  showPercentage = true,
  horizontal = true,
}: BreakdownChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const colors = {
    primary: isDark ? '#3b82f6' : '#2563eb',
    bars: [
      isDark ? '#3b82f6' : '#2563eb',
      isDark ? '#8b5cf6' : '#7c3aed',
      isDark ? '#06b6d4' : '#0891b2',
      isDark ? '#10b981' : '#059669',
      isDark ? '#f59e0b' : '#d97706',
      isDark ? '#ef4444' : '#dc2626',
    ],
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#94a3b8' : '#64748b',
  }

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, true)
      case 'percent':
        return formatPercent(value)
      default:
        return value.toLocaleString()
    }
  }

  if (horizontal) {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text, fontSize: 12 }}
              tickFormatter={formatValue}
            />
            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text, fontSize: 12 }}
              width={75}
            />
            <Tooltip content={<CustomTooltip format={format} showPercentage={showPercentage} />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors.bars[index % colors.bars.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text, fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text, fontSize: 12 }}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip format={format} showPercentage={showPercentage} />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors.bars[index % colors.bars.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: BreakdownDataPoint }>
  format: 'currency' | 'percent' | 'number'
  showPercentage: boolean
}

function CustomTooltip({ active, payload, format, showPercentage }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0].payload

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, true)
      case 'percent':
        return formatPercent(value)
      default:
        return value.toLocaleString()
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-3">
      <p className="text-sm font-medium mb-1">{data.label}</p>
      <p className="text-sm font-semibold">{formatValue(data.value)}</p>
      {showPercentage && data.percentage !== undefined && (
        <p className="text-xs text-muted-foreground">
          {formatPercent(data.percentage)} of total
        </p>
      )}
      {data.change !== undefined && (
        <p
          className={`text-xs ${
            data.change >= 0 ? 'text-status-success' : 'text-status-danger'
          }`}
        >
          {data.change >= 0 ? '+' : ''}
          {formatPercent(data.change)} vs prev
        </p>
      )}
    </div>
  )
}
