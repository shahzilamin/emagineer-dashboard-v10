'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full',
        {
          'bg-secondary text-secondary-foreground': variant === 'default',
          'bg-status-success/10 text-status-success': variant === 'success',
          'bg-status-warning/10 text-status-warning': variant === 'warning',
          'bg-status-danger/10 text-status-danger': variant === 'danger',
          'border border-border bg-transparent': variant === 'outline',
        },
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
