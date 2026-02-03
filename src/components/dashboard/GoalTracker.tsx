'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatCurrency, formatPercent } from '@/lib/formatters'

interface Goal {
  id: string
  label: string
  current: number
  target: number
  format: 'currency' | 'percent'
  benchmark?: {
    value: number
    label: string
  }
  daysElapsed: number
  daysTotal: number
  previousPeriod?: number
}

interface GoalTrackerProps {
  businessUnit: 'wellbefore' | 'd2c-builders'
  timePeriod: string
}

// Mock data with Finaloop benchmarks
const wellbeforeGoals: Goal[] = [
  {
    id: 'revenue-mtd',
    label: 'MTD Revenue',
    current: 847234,
    target: 920000,
    format: 'currency',
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 798456,
  },
  {
    id: 'gross-margin',
    label: 'Gross Margin',
    current: 42.5,
    target: 44,
    format: 'percent',
    benchmark: { value: 52, label: '7-fig median' },
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 43.2,
  },
  {
    id: 'contribution-margin',
    label: 'Contribution Margin',
    current: 28.4,
    target: 30,
    format: 'percent',
    benchmark: { value: 25, label: 'Industry median' },
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 26.8,
  },
  {
    id: 'ebitda',
    label: 'EBITDA',
    current: 5.8,
    target: 6,
    format: 'percent',
    benchmark: { value: 4, label: '7-fig median' },
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 4.9,
  },
]

const d2cGoals: Goal[] = [
  {
    id: 'revenue-mtd',
    label: 'MTD Revenue',
    current: 156000,
    target: 180000,
    format: 'currency',
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 142000,
  },
  {
    id: 'perfect-order',
    label: 'Perfect Order Rate',
    current: 98.7,
    target: 99.0,
    format: 'percent',
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 98.2,
  },
  {
    id: 'on-time-ship',
    label: 'On-Time Ship Rate',
    current: 96.8,
    target: 98.0,
    format: 'percent',
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 97.1,
  },
  {
    id: 'cost-per-order',
    label: 'Cost/Order',
    current: 4.85,
    target: 4.50,
    format: 'currency',
    daysElapsed: 3,
    daysTotal: 28,
    previousPeriod: 4.72,
  },
]

export function GoalTracker({ businessUnit, timePeriod }: GoalTrackerProps) {
  const goals = businessUnit === 'wellbefore' ? wellbeforeGoals : d2cGoals

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Goal Tracking</h2>
        <span className="text-sm text-muted-foreground">— Are we on track?</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal, index) => (
          <GoalCard key={goal.id} goal={goal} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

function GoalCard({ goal, index }: { goal: Goal; index: number }) {
  const percentComplete = (goal.current / goal.target) * 100
  const timeElapsedPercent = (goal.daysElapsed / goal.daysTotal) * 100
  
  // Calculate pace: are we ahead or behind where we should be?
  const expectedProgress = (goal.daysElapsed / goal.daysTotal) * goal.target
  const paceDiff = goal.current - expectedProgress
  const pacePercent = (paceDiff / goal.target) * 100
  
  // Determine status
  const isAhead = pacePercent >= 0
  const isOnTrack = Math.abs(pacePercent) < 5
  const isBehind = pacePercent < -5
  
  // Calculate what's needed to hit goal
  const remaining = goal.target - goal.current
  const daysRemaining = goal.daysTotal - goal.daysElapsed
  const neededPerDay = remaining / daysRemaining
  const currentPerDay = goal.current / goal.daysElapsed

  const formatValue = (value: number) => {
    return goal.format === 'currency' 
      ? formatCurrency(value, true) 
      : formatPercent(value)
  }

  const getStatusColor = () => {
    if (percentComplete >= 100) return 'text-status-success'
    if (isAhead || isOnTrack) return 'text-status-success'
    if (isBehind) return 'text-status-danger'
    return 'text-status-warning'
  }

  const getStatusIcon = () => {
    if (percentComplete >= 100) return CheckCircle
    if (isAhead) return TrendingUp
    if (isBehind) return TrendingDown
    return Clock
  }

  const StatusIcon = getStatusIcon()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "bg-card border rounded-xl p-4",
        isBehind && "border-status-danger/50"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{goal.label}</span>
        <StatusIcon className={cn("h-4 w-4", getStatusColor())} />
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-2xl font-bold">{formatValue(goal.current)}</span>
          <span className="text-sm text-muted-foreground">/ {formatValue(goal.target)}</span>
        </div>
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          {/* Time elapsed marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-muted-foreground/50 z-10"
            style={{ left: `${Math.min(timeElapsedPercent, 100)}%` }}
          />
          {/* Progress bar */}
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              percentComplete >= 100 ? "bg-status-success" :
              isAhead ? "bg-primary" :
              isBehind ? "bg-status-danger" : "bg-status-warning"
            )}
            style={{ width: `${Math.min(percentComplete, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {percentComplete.toFixed(0)}% complete
          </span>
          <span className="text-xs text-muted-foreground">
            {timeElapsedPercent.toFixed(0)}% of month
          </span>
        </div>
      </div>

      {/* Pace Indicator */}
      <div className={cn(
        "text-sm px-2 py-1 rounded-lg mb-2",
        isAhead ? "bg-status-success/10 text-status-success" :
        isBehind ? "bg-status-danger/10 text-status-danger" :
        "bg-status-warning/10 text-status-warning"
      )}>
        {percentComplete >= 100 ? (
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Goal achieved!
          </span>
        ) : isAhead ? (
          <span>📈 Ahead by {formatValue(Math.abs(paceDiff))} ({Math.abs(pacePercent).toFixed(1)}%)</span>
        ) : (
          <span>📉 Behind by {formatValue(Math.abs(paceDiff))} ({Math.abs(pacePercent).toFixed(1)}%)</span>
        )}
      </div>

      {/* What's Needed */}
      {percentComplete < 100 && (
        <div className="text-xs text-muted-foreground">
          Need {formatValue(neededPerDay)}/day · Current pace: {formatValue(currentPerDay)}/day
        </div>
      )}

      {/* Benchmark (if available) */}
      {goal.benchmark && (
        <div className="mt-2 pt-2 border-t border-border/50 text-xs text-muted-foreground">
          vs {goal.benchmark.label}: {formatValue(goal.benchmark.value)}
          {goal.current > goal.benchmark.value ? (
            <span className="text-status-success ml-1">✓ Above</span>
          ) : (
            <span className="text-status-warning ml-1">↑ Below</span>
          )}
        </div>
      )}
    </motion.div>
  )
}
