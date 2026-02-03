'use client'

import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { TrendIndicator } from './TrendIndicator'
import { StatusBadge } from './StatusBadge'
import { SparklineChart } from './SparklineChart'
import { GoalProgress } from './GoalProgress'
import { Metric } from '@/types'
import {
  formatCurrency,
  formatPercent,
  formatNumber,
  formatRatio,
  formatTime,
  formatMonths,
} from '@/lib/formatters'
import { cn } from '@/lib/cn'

interface MetricCardProps {
  metric: Metric
  onClick?: () => void
  showComparison?: boolean
  className?: string
  index?: number
}

export function MetricCard({
  metric,
  onClick,
  showComparison = false,
  className,
  index = 0,
}: MetricCardProps) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, true)
      case 'percent':
        return formatPercent(value)
      case 'number':
        return formatNumber(value, true)
      case 'ratio':
        return formatRatio(value)
      case 'time':
        return formatTime(value)
      case 'months':
        return formatMonths(value)
      default:
        return value.toString()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        className={cn(
          'p-5 cursor-pointer transition-all duration-200',
          'hover:shadow-md hover:border-primary/20',
          'group',
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-muted-foreground truncate">
                {metric.label}
              </span>
              {metric.description && (
                <Info className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight">
                {formatValue(metric.value, metric.format)}
              </span>
              {metric.trend && metric.changeFormatted && (
                <TrendIndicator
                  direction={metric.trend}
                  value={metric.changeFormatted}
                  higherIsBetter={metric.higherIsBetter}
                />
              )}
            </div>

            {showComparison && metric.previousValue !== undefined && (
              <div className="mt-2">
                <ComparisonBar
                  current={metric.value}
                  previous={metric.previousValue}
                  format={metric.format}
                />
              </div>
            )}

            <div className="flex items-center gap-3 mt-3">
              {metric.status && <StatusBadge status={metric.status} />}
              {metric.sparkline && (
                <SparklineChart
                  data={metric.sparkline}
                  color={
                    metric.status === 'success' ? 'success' :
                    metric.status === 'warning' ? 'warning' :
                    metric.status === 'danger' ? 'danger' : 'primary'
                  }
                />
              )}
            </div>
          </div>

          {metric.goal && (
            <GoalProgress goal={metric.goal} size={52} />
          )}
        </div>
      </Card>
    </motion.div>
  )
}

interface ComparisonBarProps {
  current: number
  previous: number
  format: string
}

function ComparisonBar({ current, previous, format }: ComparisonBarProps) {
  const max = Math.max(current, previous)
  const currentWidth = (current / max) * 100
  const previousWidth = (previous / max) * 100

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, true)
      case 'percent':
        return formatPercent(value)
      default:
        return formatNumber(value, true)
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Current</span>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${currentWidth}%` }}
          />
        </div>
        <span className="text-xs font-medium w-16 text-right">
          {formatValue(current)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Previous</span>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-muted-foreground/30 rounded-full transition-all duration-500"
            style={{ width: `${previousWidth}%` }}
          />
        </div>
        <span className="text-xs font-medium w-16 text-right text-muted-foreground">
          {formatValue(previous)}
        </span>
      </div>
    </div>
  )
}
