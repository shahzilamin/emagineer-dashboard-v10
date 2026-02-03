'use client'

import { useEffect, useState, useCallback } from 'react'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Settings,
  Moon,
  Sun,
  Download,
  RefreshCw,
} from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { useTheme } from '@/components/theme/ThemeProvider'
import { cn } from '@/lib/cn'

export function CommandBar() {
  const { commandBarOpen, setCommandBarOpen, setBusinessUnit, setTimePeriod, refreshData } = useDashboardStore()
  const { setTheme, resolvedTheme } = useTheme()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandBarOpen(!commandBarOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [commandBarOpen, setCommandBarOpen])

  const runCommand = useCallback((command: () => void) => {
    command()
    setCommandBarOpen(false)
    setSearch('')
  }, [setCommandBarOpen])

  return (
    <AnimatePresence>
      {commandBarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setCommandBarOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-1/4 z-50 w-full max-w-lg -translate-x-1/2"
          >
            <Command
              className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              loop
            >
              <div className="flex items-center gap-2 px-4 border-b border-border">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  value={search}
                  onValueChange={setSearch}
                />
                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                  <CommandItem
                    onSelect={() => runCommand(() => setBusinessUnit('wellbefore'))}
                    icon={<LayoutDashboard className="h-4 w-4" />}
                  >
                    Go to WellBefore
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => setBusinessUnit('d2c-builders'))}
                    icon={<Package className="h-4 w-4" />}
                  >
                    Go to D2C Builders
                  </CommandItem>
                </Command.Group>

                <Command.Group heading="Time Periods" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                  <CommandItem
                    onSelect={() => runCommand(() => setTimePeriod('today'))}
                    icon={<TrendingUp className="h-4 w-4" />}
                  >
                    View Today
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => setTimePeriod('mtd'))}
                    icon={<TrendingUp className="h-4 w-4" />}
                  >
                    View Month to Date
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => setTimePeriod('ytd'))}
                    icon={<TrendingUp className="h-4 w-4" />}
                  >
                    View Year to Date
                  </CommandItem>
                </Command.Group>

                <Command.Group heading="Actions" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                  <CommandItem
                    onSelect={() => runCommand(refreshData)}
                    icon={<RefreshCw className="h-4 w-4" />}
                  >
                    Refresh Data
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => console.log('Export PDF'))}
                    icon={<Download className="h-4 w-4" />}
                  >
                    Export as PDF
                  </CommandItem>
                </Command.Group>

                <Command.Group heading="Settings" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                  <CommandItem
                    onSelect={() => runCommand(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))}
                    icon={resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  >
                    Toggle Theme
                  </CommandItem>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CommandItem({
  children,
  onSelect,
  icon,
}: {
  children: React.ReactNode
  onSelect: () => void
  icon?: React.ReactNode
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer',
        'aria-selected:bg-accent aria-selected:text-accent-foreground',
        'transition-colors'
      )}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      {children}
    </Command.Item>
  )
}
