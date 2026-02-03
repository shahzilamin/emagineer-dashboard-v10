'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoItemProps {
  children: ReactNode
  className?: string
  span?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2
}

export function BentoItem({
  children,
  className,
  span = 1,
  rowSpan = 1,
}: BentoItemProps) {
  return (
    <div
      className={cn(
        {
          'sm:col-span-1': span === 1,
          'sm:col-span-2': span === 2,
          'sm:col-span-2 lg:col-span-3': span === 3,
          'sm:col-span-2 lg:col-span-3 xl:col-span-4': span === 4,
          'row-span-1': rowSpan === 1,
          'row-span-2': rowSpan === 2,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
