'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { cn } from '@/lib/cn'

interface ExecutiveHeroProps {
  businessUnit: 'wellbefore' | 'd2c-builders'
}

// Mock data - matches shopify-forecast structure
const heroData = {
  wellbefore: {
    todayRevenue: 31245,
    todayTrend: 'up' as const,
    todayChange: 8.2,
    mtdRevenue: 847234,
    mtdTarget: 920000,
    mtdPercent: 92,
    ltvCacRatio: 7.71,
    ltvCacTarget: 3,
    grossMargin: 42.5,
    grossMarginChange: -1.6,
    grossMarginBenchmark: 52, // Finaloop 7-fig median
    healthScore: 87,
  },
  'd2c-builders': {
    todayRevenue: 8420,
    todayTrend: 'up' as const,
    todayChange: 5.3,
    mtdRevenue: 156000,
    mtdTarget: 180000,
    mtdPercent: 87,
    ltvCacRatio: 4.2,
    ltvCacTarget: 3,
    grossMargin: 38.5,
    grossMarginChange: 1.2,
    grossMarginBenchmark: 45,
    healthScore: 82,
  },
}

export function ExecutiveHero({ businessUnit }: ExecutiveHeroProps) {
  const data = heroData[businessUnit]
  const greeting = getGreeting()
  const businessName = businessUnit === 'wellbefore' ? 'WellBefore' : 'D2C Builders'

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{greeting}, Shahzil</h1>
          <p className="text-blue-100 mt-1">Here's how {businessName} is performing</p>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm">Health Score</p>
          <div className="flex items-center justify-end gap-2 mt-1">
            <span className="text-3xl font-bold">{data.healthScore}</span>
            <HealthDots score={data.healthScore} />
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {/* Today's Revenue */}
        <div>
          <p className="text-blue-200 text-sm">Today's Revenue</p>
          <p className="text-3xl font-bold mt-1">{formatCurrency(data.todayRevenue)}</p>
          <div className="flex items-center gap-1 mt-1 text-sm">
            {data.todayTrend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-300" />
            )}
            <span className={data.todayTrend === 'up' ? 'text-emerald-300' : 'text-red-300'}>
              {data.todayChange > 0 ? '+' : ''}{data.todayChange}%
            </span>
            <span className="text-blue-200">vs yesterday</span>
          </div>
        </div>

        {/* MTD Progress */}
        <div>
          <p className="text-blue-200 text-sm">MTD Progress</p>
          <p className="text-3xl font-bold mt-1">{formatCurrency(data.mtdRevenue, true)}</p>
          <div className="mt-2">
            <div className="w-full h-2 bg-blue-400/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${data.mtdPercent}%` }}
              />
            </div>
            <p className="text-xs text-blue-200 mt-1">
              {data.mtdPercent}% to {formatCurrency(data.mtdTarget, true)} goal
            </p>
          </div>
        </div>

        {/* LTV:CAC Ratio */}
        <div>
          <p className="text-blue-200 text-sm">LTV:CAC Ratio</p>
          <p className="text-3xl font-bold mt-1">{data.ltvCacRatio}:1</p>
          <p className={cn(
            "text-sm mt-1",
            data.ltvCacRatio >= data.ltvCacTarget ? "text-emerald-300" : "text-amber-300"
          )}>
            {data.ltvCacRatio >= data.ltvCacTarget ? '✓ Above' : '↑ Below'} {data.ltvCacTarget}:1 target
          </p>
        </div>

        {/* Gross Margin */}
        <div>
          <p className="text-blue-200 text-sm">Gross Margin</p>
          <p className="text-3xl font-bold mt-1">{data.grossMargin}%</p>
          <div className="flex items-center gap-1 mt-1 text-sm">
            {data.grossMarginChange >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            ) : (
              <TrendingDown className="w-4 h-4 text-amber-300" />
            )}
            <span className={data.grossMarginChange >= 0 ? 'text-emerald-300' : 'text-amber-300'}>
              {data.grossMarginChange > 0 ? '+' : ''}{data.grossMarginChange}%
            </span>
            <span className="text-blue-200 text-xs">
              (Benchmark: {data.grossMarginBenchmark}%)
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function HealthDots({ score }: { score: number }) {
  const filled = Math.round(score / 20) // 0-100 -> 0-5 dots
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            i <= filled ? "bg-white" : "bg-blue-400/40"
          )}
        />
      ))}
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
