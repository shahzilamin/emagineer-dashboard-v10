'use client'

import { useDashboardStore } from '@/store/dashboardStore'
import { BusinessUnit } from '@/types'
import { cn } from '@/lib/cn'
import { ShoppingCart, Warehouse } from 'lucide-react'

const units: { value: BusinessUnit; label: string; icon: typeof ShoppingCart }[] = [
  { value: 'wellbefore', label: 'WellBefore', icon: ShoppingCart },
  { value: 'd2c-builders', label: 'D2C Builders', icon: Warehouse },
]

export function BusinessUnitTabs() {
  const { businessUnit, setBusinessUnit } = useDashboardStore()

  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      {units.map((unit) => {
        const Icon = unit.icon
        return (
          <button
            key={unit.value}
            onClick={() => setBusinessUnit(unit.value)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
              businessUnit === unit.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{unit.label}</span>
          </button>
        )
      })}
    </div>
  )
}
