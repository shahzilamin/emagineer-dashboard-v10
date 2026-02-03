'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Clock } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatCurrency } from '@/lib/formatters'

interface CashRunwayProps {
  businessUnit: 'wellbefore' | 'd2c-builders'
}

// Mock data - will be replaced with real accounting data
const cashData = {
  wellbefore: {
    currentCash: 892000,
    monthlyBurn: 48000,
    runwayWeeks: 18,
    runwayTrend: 'up' as const,
    weeklyChange: 2,
    projections: [
      { week: 'Now', cash: 892000 },
      { week: 'W2', cash: 880000 },
      { week: 'W4', cash: 856000 },
      { week: 'W6', cash: 832000 },
      { week: 'W8', cash: 820000 },
      { week: 'W10', cash: 798000 },
      { week: 'W12', cash: 785000 },
      { week: 'W13', cash: 778000 },
    ],
    scenarios: {
      current: 18,
      conservative: 14,
      aggressive: 22,
    },
    insights: [
      { type: 'positive', text: 'Q4 AR collections ahead of schedule (+$45K)' },
      { type: 'warning', text: 'Inventory PO due in 3 weeks ($120K)' },
    ],
  },
  'd2c-builders': {
    currentCash: 345000,
    monthlyBurn: 28000,
    runwayWeeks: 12,
    runwayTrend: 'flat' as const,
    weeklyChange: 0,
    projections: [
      { week: 'Now', cash: 345000 },
      { week: 'W2', cash: 338000 },
      { week: 'W4', cash: 324000 },
      { week: 'W6', cash: 310000 },
      { week: 'W8', cash: 296000 },
      { week: 'W10', cash: 282000 },
      { week: 'W12', cash: 268000 },
      { week: 'W13', cash: 261000 },
    ],
    scenarios: {
      current: 12,
      conservative: 10,
      aggressive: 15,
    },
    insights: [
      { type: 'positive', text: 'New client onboarding adds $18K MRR in 30 days' },
      { type: 'neutral', text: 'Lease renewal due Q2 - budget $8K increase' },
    ],
  },
}

export function CashRunway({ businessUnit }: CashRunwayProps) {
  const data = cashData[businessUnit]
  
  const getRunwayStatus = (weeks: number) => {
    if (weeks >= 16) return { color: 'text-status-success', bg: 'bg-status-success/10', label: 'Healthy', icon: TrendingUp }
    if (weeks >= 10) return { color: 'text-status-warning', bg: 'bg-status-warning/10', label: 'Plan Ahead', icon: Clock }
    return { color: 'text-status-danger', bg: 'bg-status-danger/10', label: 'Action Required', icon: AlertTriangle }
  }

  const status = getRunwayStatus(data.runwayWeeks)
  const StatusIcon = status.icon
  const maxCash = Math.max(...data.projections.map(p => p.cash))

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className={cn(
        "rounded-2xl border-2 p-6",
        status.bg,
        data.runwayWeeks < 10 ? "border-status-danger" : "border-transparent"
      )}>
        {/* Hero Runway Number */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={cn(
              "h-20 w-20 rounded-2xl flex items-center justify-center",
              status.bg
            )}>
              <DollarSign className={cn("h-10 w-10", status.color)} />
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className={cn("text-6xl font-bold tracking-tight", status.color)}>
                  {data.runwayWeeks}
                </span>
                <span className="text-2xl text-muted-foreground">weeks</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StatusIcon className={cn("h-4 w-4", status.color)} />
                <span className={cn("text-sm font-medium", status.color)}>{status.label}</span>
                {data.weeklyChange !== 0 && (
                  <span className={cn(
                    "text-sm",
                    data.weeklyChange > 0 ? "text-status-success" : "text-status-danger"
                  )}>
                    ({data.weeklyChange > 0 ? '+' : ''}{data.weeklyChange} vs last week)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Cash Position */}
          <div className="flex gap-8">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current Cash</div>
              <div className="text-3xl font-bold">{formatCurrency(data.currentCash, true)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Monthly Burn</div>
              <div className="text-3xl font-bold text-status-warning">-{formatCurrency(data.monthlyBurn, true)}</div>
            </div>
          </div>
        </div>

        {/* 13-Week Projection Chart */}
        <div className="mt-6">
          <div className="text-sm font-medium text-muted-foreground mb-3">13-Week Cash Projection</div>
          <div className="flex items-end gap-1 h-24">
            {data.projections.map((point, i) => {
              const height = (point.cash / maxCash) * 100
              const isLow = point.cash < data.currentCash * 0.7
              return (
                <div key={point.week} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className={cn(
                      "w-full rounded-t transition-all",
                      isLow ? "bg-status-warning" : "bg-primary"
                    )}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{point.week}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Insights */}
        {data.insights.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-3">
              {data.insights.map((insight, i) => (
                <div
                  key={i}
                  className={cn(
                    "text-sm px-3 py-1.5 rounded-lg",
                    insight.type === 'positive' && "bg-status-success/10 text-status-success",
                    insight.type === 'warning' && "bg-status-warning/10 text-status-warning",
                    insight.type === 'neutral' && "bg-secondary text-muted-foreground"
                  )}
                >
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
