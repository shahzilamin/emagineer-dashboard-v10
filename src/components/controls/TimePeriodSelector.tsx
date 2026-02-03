'use client'

import { useDashboardStore } from '@/store/dashboardStore'
import { TimePeriod } from '@/types'
import { cn } from '@/lib/cn'

const periods: { value: TimePeriod; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'wtd', label: 'WTD' },
  { value: 'mtd', label: 'MTD' },
  { value: 'qtd', label: 'QTD' },
  { value: 'ytd', label: 'YTD' },
]

export function TimePeriodSelector() {
  const { timePeriod, setTimePeriod } = useDashboardStore()

  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => setTimePeriod(period.value)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            timePeriod === period.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}
