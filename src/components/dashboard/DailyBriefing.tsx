'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Metric } from '@/types'
import {
  AlertTriangle,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

interface DailyBriefingProps {
  metrics: Metric[]
  businessUnit: string
  timePeriod: string
  onMetricClick?: (metricId: string) => void
}

interface Insight {
  type: 'warning' | 'win' | 'focus' | 'goal'
  metricId: string
  metricLabel: string
  message: string
  priority: number
}

function analyzeMetrics(metrics: Metric[]): Insight[] {
  const insights: Insight[] = []

  metrics.forEach((metric) => {
    // Check for warnings/dangers
    if (metric.status === 'warning' || metric.status === 'danger') {
      const direction = metric.higherIsBetter ? 'below' : 'above'
      insights.push({
        type: 'warning',
        metricId: metric.id,
        metricLabel: metric.label,
        message: `${metric.label} is ${direction} target range`,
        priority: metric.status === 'danger' ? 10 : 7,
      })
    }

    // Check for significant positive changes (wins)
    if (metric.change && metric.status === 'success') {
      const significantChange = metric.higherIsBetter
        ? metric.change > 5
        : metric.change < -5
      if (significantChange) {
        insights.push({
          type: 'win',
          metricId: metric.id,
          metricLabel: metric.label,
          message: `${metric.label} improved ${metric.changeFormatted}`,
          priority: 4,
        })
      }
    }

    // Check goal progress
    if (metric.goal) {
      const progress = (metric.goal.current / metric.goal.target) * 100
      if (progress >= 100) {
        insights.push({
          type: 'goal',
          metricId: metric.id,
          metricLabel: metric.label,
          message: `${metric.goal.label} achieved! (${progress.toFixed(0)}%)`,
          priority: 5,
        })
      } else if (progress < 80) {
        insights.push({
          type: 'warning',
          metricId: metric.id,
          metricLabel: metric.label,
          message: `${metric.label} at ${progress.toFixed(0)}% of goal - needs attention`,
          priority: 8,
        })
      }
    }

    // Check for concerning trends (3+ days in wrong direction)
    if (metric.sparkline && metric.sparkline.length >= 3) {
      const recent = metric.sparkline.slice(-3)
      const isDecreasing = recent[2].value < recent[1].value && recent[1].value < recent[0].value
      const isIncreasing = recent[2].value > recent[1].value && recent[1].value > recent[0].value
      
      const concerningTrend = metric.higherIsBetter ? isDecreasing : isIncreasing
      if (concerningTrend) {
        insights.push({
          type: 'warning',
          metricId: metric.id,
          metricLabel: metric.label,
          message: `${metric.label} trending ${metric.higherIsBetter ? 'down' : 'up'} for 3+ days`,
          priority: 6,
        })
      }
    }
  })

  // Sort by priority (higher = more important)
  return insights.sort((a, b) => b.priority - a.priority)
}

function getTopFocus(insights: Insight[], metrics: Metric[]): string {
  const warnings = insights.filter((i) => i.type === 'warning')
  
  if (warnings.length > 0) {
    return `Focus on ${warnings[0].metricLabel} - it needs your attention today.`
  }

  // Find the metric with the biggest improvement opportunity
  const improvableMetrics = metrics.filter(
    (m) => m.goal && (m.goal.current / m.goal.target) * 100 < 100
  )
  
  if (improvableMetrics.length > 0) {
    const closest = improvableMetrics.reduce((a, b) => {
      const aProgress = (a.goal!.current / a.goal!.target) * 100
      const bProgress = (b.goal!.current / b.goal!.target) * 100
      return Math.abs(100 - aProgress) < Math.abs(100 - bProgress) ? a : b
    })
    return `Push ${closest.label} over the finish line - you're ${((closest.goal!.current / closest.goal!.target) * 100).toFixed(0)}% there.`
  }

  return 'All systems green. Look for the next growth lever.'
}

function getOverallStatus(insights: Insight[]): 'excellent' | 'good' | 'attention' {
  const warnings = insights.filter((i) => i.type === 'warning')
  if (warnings.length >= 3 || warnings.some((w) => w.priority >= 9)) {
    return 'attention'
  }
  if (warnings.length >= 1) {
    return 'good'
  }
  return 'excellent'
}

export function DailyBriefing({
  metrics,
  businessUnit,
  timePeriod,
  onMetricClick,
}: DailyBriefingProps) {
  const insights = useMemo(() => analyzeMetrics(metrics), [metrics])
  const topFocus = useMemo(() => getTopFocus(insights, metrics), [insights, metrics])
  const overallStatus = useMemo(() => getOverallStatus(insights), [insights])

  const warnings = insights.filter((i) => i.type === 'warning').slice(0, 3)
  const wins = insights.filter((i) => i.type === 'win' || i.type === 'goal').slice(0, 2)

  const statusConfig = {
    excellent: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      label: 'Excellent',
      icon: CheckCircle2,
    },
    good: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      border: 'border-amber-500/30',
      text: 'text-amber-600 dark:text-amber-400',
      label: 'Needs Attention',
      icon: AlertTriangle,
    },
    attention: {
      bg: 'bg-red-500/10 dark:bg-red-500/20',
      border: 'border-red-500/30',
      text: 'text-red-600 dark:text-red-400',
      label: 'Action Required',
      icon: AlertTriangle,
    },
  }

  const config = statusConfig[overallStatus]
  const StatusIcon = config.icon

  const periodLabel = {
    today: "Today's",
    wtd: 'This Week',
    mtd: 'This Month',
    qtd: 'This Quarter',
    ytd: 'This Year',
  }[timePeriod] || 'Current'

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border ${config.border} ${config.bg} p-6 mb-8`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-foreground/70" />
            <h2 className="text-lg font-semibold">CEO Daily Briefing</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {periodLabel} snapshot for{' '}
            {businessUnit === 'wellbefore' ? 'WellBefore' : 'D2C Builders'}
          </p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.text}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{config.label}</span>
        </div>
      </div>

      {/* Top Focus */}
      <div className="bg-background/50 rounded-lg p-4 mb-4 border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Today's Focus</span>
        </div>
        <p className="text-foreground font-medium">{topFocus}</p>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Warnings */}
        {warnings.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Needs Attention
              </span>
            </div>
            <ul className="space-y-1.5">
              {warnings.map((warning, i) => (
                <li key={i}>
                  <button
                    onClick={() => onMetricClick?.(warning.metricId)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group w-full text-left"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{warning.message}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Wins */}
        {wins.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Wins
              </span>
            </div>
            <ul className="space-y-1.5">
              {wins.map((win, i) => (
                <li key={i}>
                  <button
                    onClick={() => onMetricClick?.(win.metricId)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group w-full text-left"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{win.message}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* No issues state */}
      {warnings.length === 0 && wins.length === 0 && (
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm">All metrics performing well. Keep the momentum!</span>
        </div>
      )}
    </motion.div>
  )
}
