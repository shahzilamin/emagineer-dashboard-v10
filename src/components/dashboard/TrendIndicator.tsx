'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { TrendDirection } from '@/types'

interface TrendIndicatorProps {
  direction: TrendDirection
  value: string
  higherIsBetter?: boolean
  className?: string
}

export function TrendIndicator({
  direction,
  value,
  higherIsBetter = true,
  className,
}: TrendIndicatorProps) {
  const isPositive = direction === 'up'
  const isNegative = direction === 'down'

  const isGood = higherIsBetter ? isPositive : isNegative
  const isBad = higherIsBetter ? isNegative : isPositive

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium',
        {
          'text-status-success': isGood,
          'text-status-danger': isBad,
          'text-muted-foreground': direction === 'flat',
        },
        className
      )}
    >
      {isPositive && <TrendingUp className="h-4 w-4" />}
      {isNegative && <TrendingDown className="h-4 w-4" />}
      {direction === 'flat' && <Minus className="h-4 w-4" />}
      {value}
    </span>
  )
}
