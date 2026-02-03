'use client'

import { useDashboardStore } from '@/store/dashboardStore'
import { cn } from '@/lib/cn'
import { ArrowLeftRight } from 'lucide-react'

export function ComparisonToggle() {
  const { comparisonMode, toggleComparisonMode } = useDashboardStore()

  return (
    <button
      onClick={toggleComparisonMode}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 border',
        comparisonMode
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-primary/50'
      )}
    >
      <ArrowLeftRight className="h-4 w-4" />
      <span className="hidden sm:inline">Compare</span>
    </button>
  )
}
