'use client'

import { RefreshCw, Command } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { TimePeriodSelector } from '@/components/controls/TimePeriodSelector'
import { BusinessUnitTabs } from '@/components/controls/BusinessUnitTabs'
import { ComparisonToggle } from '@/components/controls/ComparisonToggle'
import { ExportMenu } from '@/components/controls/ExportMenu'
import { Button } from '@/components/ui/Button'
import { useDashboardStore } from '@/store/dashboardStore'
import { formatRelativeTime } from '@/lib/formatters'
import { cn } from '@/lib/cn'

export function Header() {
  const { lastUpdated, refreshData, toggleCommandBar } = useDashboardStore()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Emagineer Dashboard</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-status-success animate-pulse" />
                  Live
                </span>
                <span>·</span>
                <span>Updated {formatRelativeTime(lastUpdated)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <BusinessUnitTabs />
            <div className="hidden sm:block h-6 w-px bg-border" />
            <TimePeriodSelector />
            <div className="hidden sm:block h-6 w-px bg-border" />
            <ComparisonToggle />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCommandBar}
              className="hidden sm:flex gap-2"
            >
              <Command className="h-4 w-4" />
              <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </Button>
            <ExportMenu />
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshData}
              aria-label="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
