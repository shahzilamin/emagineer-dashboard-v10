'use client'

import { ChannelBreakdown as ChannelBreakdownType } from '@/types'
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters'
import { TrendingUp, TrendingDown, Globe, ShoppingBag, Store, Building2 } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ChannelBreakdownProps {
  data: ChannelBreakdownType[]
  format: string
}

const channelIcons: Record<string, typeof Globe> = {
  direct: Globe,
  amazon: ShoppingBag,
  walmart: Store,
  b2b: Building2,
  wellbefore: Globe,
  external: Building2,
}

export function ChannelBreakdown({ data, format }: ChannelBreakdownProps) {
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
    <div className="space-y-4 mt-4">
      {data.map((item) => {
        const Icon = channelIcons[item.channel] || Globe
        return (
          <div
            key={item.label}
            className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.label}</span>
                <span className="font-semibold">{formatValue(item.value)}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex-1 mr-4">
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{item.percentage}%</span>
                  {item.change !== undefined && (
                    <span
                      className={cn(
                        'flex items-center gap-0.5',
                        item.change > 0 ? 'text-status-success' : item.change < 0 ? 'text-status-danger' : 'text-muted-foreground'
                      )}
                    >
                      {item.change > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : item.change < 0 ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : null}
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
