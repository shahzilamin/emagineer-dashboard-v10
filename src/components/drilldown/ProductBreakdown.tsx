'use client'

import { ProductBreakdown as ProductBreakdownType } from '@/types'
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ProductBreakdownProps {
  data: ProductBreakdownType[]
  format: string
}

export function ProductBreakdown({ data, format }: ProductBreakdownProps) {
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

  const total = data.reduce((sum, item) => sum + (format === 'percent' ? item.percentage : item.value), 0)

  return (
    <div className="space-y-3 mt-4">
      {data.map((item, index) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.label}</span>
              {item.category && (
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  {item.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">{formatValue(item.value)}</span>
              {item.change !== undefined && (
                <span
                  className={cn(
                    'flex items-center gap-1 text-sm',
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
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{item.percentage.toFixed(1)}% of total</span>
            {item.sku && <span>SKU: {item.sku}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
