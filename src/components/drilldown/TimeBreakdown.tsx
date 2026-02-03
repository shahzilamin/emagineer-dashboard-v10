'use client'

import { TimeBreakdown as TimeBreakdownType } from '@/types'
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface TimeBreakdownProps {
  data: TimeBreakdownType[]
  format: string
}

export function TimeBreakdown({ data, format }: TimeBreakdownProps) {
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

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="mt-4">
      <div className="flex items-end gap-2 h-48">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100
          return (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center">
                {item.change !== undefined && (
                  <span
                    className={cn(
                      'flex items-center gap-0.5 text-xs mb-1',
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
                <span className="text-sm font-semibold">{formatValue(item.value)}</span>
              </div>
              <div
                className="w-full bg-primary rounded-t-lg transition-all duration-500"
                style={{ height: `${height}%`, minHeight: '20px' }}
              />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
