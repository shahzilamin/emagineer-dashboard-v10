'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { BusinessUnit } from '@/types'

interface ChannelData {
  channel: string
  icon: string
  spend: number
  revenue: number
  roas: number
  roasTrend: 'up' | 'down' | 'flat'
  cac: number
  cacTrend: 'up' | 'down' | 'flat'
  orders: number
  cvr: number
  status: 'excellent' | 'good' | 'warning' | 'danger'
}

interface MarketingPerformanceTableProps {
  businessUnit: BusinessUnit
}

// Mock data - would come from real API
const getMarketingData = (businessUnit: BusinessUnit): ChannelData[] => {
  if (businessUnit === 'wellbefore') {
    return [
      {
        channel: 'Meta Ads',
        icon: '📘',
        spend: 42500,
        revenue: 148750,
        roas: 3.5,
        roasTrend: 'up',
        cac: 18.50,
        cacTrend: 'down',
        orders: 2298,
        cvr: 3.2,
        status: 'excellent',
      },
      {
        channel: 'Google Ads',
        icon: '🔍',
        spend: 35200,
        revenue: 105600,
        roas: 3.0,
        roasTrend: 'flat',
        cac: 22.00,
        cacTrend: 'flat',
        orders: 1600,
        cvr: 2.8,
        status: 'good',
      },
      {
        channel: 'TikTok Ads',
        icon: '🎵',
        spend: 15000,
        revenue: 33000,
        roas: 2.2,
        roasTrend: 'up',
        cac: 31.25,
        cacTrend: 'down',
        orders: 480,
        cvr: 1.9,
        status: 'warning',
      },
      {
        channel: 'Amazon PPC',
        icon: '📦',
        spend: 28400,
        revenue: 99400,
        roas: 3.5,
        roasTrend: 'down',
        cac: 16.50,
        cacTrend: 'up',
        orders: 1721,
        cvr: 4.1,
        status: 'good',
      },
      {
        channel: 'Email',
        icon: '📧',
        spend: 2500,
        revenue: 45000,
        roas: 18.0,
        roasTrend: 'up',
        cac: 3.12,
        cacTrend: 'flat',
        orders: 800,
        cvr: 8.5,
        status: 'excellent',
      },
    ]
  }
  // D2C Builders data
  return [
    {
      channel: 'LinkedIn Ads',
      icon: '💼',
      spend: 8500,
      revenue: 42500,
      roas: 5.0,
      roasTrend: 'up',
      cac: 850,
      cacTrend: 'down',
      orders: 10,
      cvr: 2.1,
      status: 'excellent',
    },
    {
      channel: 'Google Ads',
      icon: '🔍',
      spend: 6200,
      revenue: 24800,
      roas: 4.0,
      roasTrend: 'flat',
      cac: 775,
      cacTrend: 'flat',
      orders: 8,
      cvr: 1.8,
      status: 'good',
    },
    {
      channel: 'Content/SEO',
      icon: '📝',
      spend: 3000,
      revenue: 36000,
      roas: 12.0,
      roasTrend: 'up',
      cac: 375,
      cacTrend: 'down',
      orders: 8,
      cvr: 3.2,
      status: 'excellent',
    },
  ]
}

const formatCurrency = (value: number, compact = false): string => {
  if (compact && value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value >= 100 ? 0 : 2,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value)
}

const TrendIcon = ({ trend, inverted = false }: { trend: 'up' | 'down' | 'flat'; inverted?: boolean }) => {
  // For CAC, down is good (inverted)
  const isGood = inverted ? trend === 'down' : trend === 'up'
  const isBad = inverted ? trend === 'up' : trend === 'down'

  if (trend === 'flat') {
    return <Minus className="w-3.5 h-3.5 text-muted-foreground" />
  }
  if (isGood) {
    return <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
  }
  if (isBad) {
    return <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
  }
  return null
}

const StatusIndicator = ({ status }: { status: ChannelData['status'] }) => {
  const colors = {
    excellent: 'bg-emerald-500',
    good: 'bg-blue-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  }
  return <span className={cn('w-2 h-2 rounded-full', colors[status])} />
}

export function MarketingPerformanceTable({ businessUnit }: MarketingPerformanceTableProps) {
  const data = getMarketingData(businessUnit)
  const totals = data.reduce(
    (acc, row) => ({
      spend: acc.spend + row.spend,
      revenue: acc.revenue + row.revenue,
      orders: acc.orders + row.orders,
    }),
    { spend: 0, revenue: 0, orders: 0 }
  )
  const blendedRoas = totals.revenue / totals.spend
  const blendedCac = totals.spend / totals.orders

  // Find best and worst performers
  const bestChannel = data.reduce((best, current) =>
    current.roas > best.roas ? current : best
  )
  const worstChannel = data.reduce((worst, current) =>
    current.roas < worst.roas ? current : worst
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mb-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Marketing Performance</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
            MTD
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-muted-foreground">Best:</span>
            <span className="font-medium">{bestChannel.channel}</span>
            <span className="text-emerald-500 font-semibold">{bestChannel.roas.toFixed(1)}x</span>
          </div>
          {worstChannel.status === 'warning' || worstChannel.status === 'danger' ? (
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-muted-foreground">Watch:</span>
              <span className="font-medium">{worstChannel.channel}</span>
              <span className="text-amber-500 font-semibold">{worstChannel.roas.toFixed(1)}x</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Channel</th>
                <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">Spend</th>
                <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">Revenue</th>
                <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    ROAS
                    <span className="text-[10px] text-muted-foreground/70">(≥3x)</span>
                  </span>
                </th>
                <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    CAC
                    <span className="text-[10px] text-muted-foreground/70">(≤$25)</span>
                  </span>
                </th>
                <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">Orders</th>
                <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">CVR</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.channel}
                  className={cn(
                    'border-b last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer',
                    row.status === 'warning' && 'bg-amber-500/5',
                    row.status === 'danger' && 'bg-red-500/5'
                  )}
                >
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <StatusIndicator status={row.status} />
                      <span>{row.icon}</span>
                      <span className="font-medium">{row.channel}</span>
                    </div>
                  </td>
                  <td className="text-right py-2.5 px-4 font-mono text-muted-foreground">
                    {formatCurrency(row.spend, true)}
                  </td>
                  <td className="text-right py-2.5 px-4 font-mono">
                    {formatCurrency(row.revenue, true)}
                  </td>
                  <td className="text-right py-2.5 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <span
                        className={cn(
                          'font-semibold font-mono',
                          row.roas >= 3 ? 'text-emerald-500' : row.roas >= 2 ? 'text-foreground' : 'text-amber-500'
                        )}
                      >
                        {row.roas.toFixed(1)}x
                      </span>
                      <TrendIcon trend={row.roasTrend} />
                    </div>
                  </td>
                  <td className="text-right py-2.5 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <span
                        className={cn(
                          'font-mono',
                          row.cac <= 20 ? 'text-emerald-500' : row.cac <= 30 ? 'text-foreground' : 'text-amber-500'
                        )}
                      >
                        {formatCurrency(row.cac)}
                      </span>
                      <TrendIcon trend={row.cacTrend} inverted />
                    </div>
                  </td>
                  <td className="text-right py-2.5 px-4 font-mono text-muted-foreground">
                    {row.orders.toLocaleString()}
                  </td>
                  <td className="text-right py-2.5 px-4">
                    <span
                      className={cn(
                        'font-mono',
                        row.cvr >= 3 ? 'text-emerald-500' : row.cvr >= 2 ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {row.cvr.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Totals Row */}
            <tfoot>
              <tr className="bg-muted/40 font-semibold">
                <td className="py-2.5 px-4">
                  <span className="text-muted-foreground">Total / Blended</span>
                </td>
                <td className="text-right py-2.5 px-4 font-mono">
                  {formatCurrency(totals.spend, true)}
                </td>
                <td className="text-right py-2.5 px-4 font-mono">
                  {formatCurrency(totals.revenue, true)}
                </td>
                <td className="text-right py-2.5 px-4">
                  <span
                    className={cn(
                      'font-mono',
                      blendedRoas >= 3 ? 'text-emerald-500' : 'text-foreground'
                    )}
                  >
                    {blendedRoas.toFixed(1)}x
                  </span>
                </td>
                <td className="text-right py-2.5 px-4">
                  <span
                    className={cn(
                      'font-mono',
                      blendedCac <= 25 ? 'text-emerald-500' : 'text-foreground'
                    )}
                  >
                    {formatCurrency(blendedCac)}
                  </span>
                </td>
                <td className="text-right py-2.5 px-4 font-mono">
                  {totals.orders.toLocaleString()}
                </td>
                <td className="text-right py-2.5 px-4 text-muted-foreground">—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Quick Insight */}
      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-4">
        <span>
          💡 <span className="text-foreground font-medium">Email</span> delivers 18x ROAS - consider expanding automation
        </span>
        <span className="text-muted-foreground/50">•</span>
        <span>
          <span className="text-foreground font-medium">TikTok</span> CAC improving - watch for breakeven at 2.5x ROAS
        </span>
      </div>
    </motion.div>
  )
}
