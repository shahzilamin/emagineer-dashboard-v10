'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { formatCurrency, formatNumber } from '@/lib/formatters'

interface Target {
  label: string
  current: number
  target: number
  format: 'currency' | 'percent' | 'number' | 'currency-short'
  benchmark?: number
  benchmarkLabel?: string
  lowerIsBetter?: boolean
}

interface TargetProgressBarProps {
  businessUnit: 'wellbefore' | 'd2c-builders'
}

// Finaloop-informed targets
const wellbeforeTargets: Target[] = [
  {
    label: 'Revenue',
    current: 847234,
    target: 920000,
    format: 'currency-short',
  },
  {
    label: 'Orders',
    current: 12458,
    target: 13500,
    format: 'number',
  },
  {
    label: 'New Customers',
    current: 3890,
    target: 4200,
    format: 'number',
  },
  {
    label: 'Gross Margin',
    current: 42.5,
    target: 44,
    format: 'percent',
    benchmark: 52,
    benchmarkLabel: '7-fig median',
  },
  {
    label: 'CAC',
    current: 18.42,
    target: 18,
    format: 'currency',
    lowerIsBetter: true,
  },
]

const d2cTargets: Target[] = [
  {
    label: 'Revenue',
    current: 156000,
    target: 180000,
    format: 'currency-short',
  },
  {
    label: 'Orders',
    current: 4200,
    target: 5000,
    format: 'number',
  },
  {
    label: 'Perfect Order',
    current: 98.7,
    target: 99.0,
    format: 'percent',
  },
  {
    label: 'On-Time Ship',
    current: 96.8,
    target: 98.0,
    format: 'percent',
  },
  {
    label: 'Cost/Order',
    current: 4.85,
    target: 4.50,
    format: 'currency',
    lowerIsBetter: true,
  },
]

export function TargetProgressBar({ businessUnit }: TargetProgressBarProps) {
  const targets = businessUnit === 'wellbefore' ? wellbeforeTargets : d2cTargets

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-card rounded-xl border border-border mb-6"
    >
      {targets.map((target, index) => (
        <ProgressItem key={target.label} target={target} index={index} />
      ))}
    </motion.div>
  )
}

function ProgressItem({ target, index }: { target: Target; index: number }) {
  const percent = target.lowerIsBetter
    ? Math.min(100, (target.target / target.current) * 100)
    : Math.min(100, (target.current / target.target) * 100)
  
  const isOnTrack = target.lowerIsBetter 
    ? target.current <= target.target 
    : target.current >= target.target * 0.9

  const formatValue = (value: number) => {
    switch (target.format) {
      case 'currency':
        return `$${value.toFixed(2)}`
      case 'currency-short':
        return formatCurrency(value, true)
      case 'percent':
        return `${value}%`
      case 'number':
        return formatNumber(value, true)
      default:
        return value.toString()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Progress Bar Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">
          {target.label}
          {target.lowerIsBetter && ' ↓'}
        </span>
        <span className={cn(
          "text-xs font-bold",
          isOnTrack ? "text-status-success" : "text-status-warning"
        )}>
          {Math.round(percent)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden mb-1.5">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            percent >= 100 ? "bg-status-success" :
            percent >= 80 ? "bg-primary" :
            "bg-status-warning"
          )}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>

      {/* Values */}
      <p className="text-xs text-muted-foreground">
        {formatValue(target.current)} / {formatValue(target.target)}
      </p>

      {/* Benchmark */}
      {target.benchmark && (
        <p className="text-xs text-muted-foreground/70 mt-0.5">
          {target.benchmarkLabel}: {formatValue(target.benchmark)}
        </p>
      )}
    </motion.div>
  )
}
