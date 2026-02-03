'use client'

import { cn } from '@/lib/cn'

interface ProgressProps {
  value: number
  max?: number
  className?: string
  indicatorClassName?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Progress({
  value,
  max = 100,
  className,
  indicatorClassName,
  size = 'md',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-full bg-secondary',
        {
          'h-1': size === 'sm',
          'h-2': size === 'md',
          'h-3': size === 'lg',
        },
        className
      )}
    >
      <div
        className={cn(
          'h-full transition-all duration-500 ease-out rounded-full',
          'bg-primary',
          indicatorClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

interface RadialProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  className?: string
  status?: 'success' | 'warning' | 'danger'
  showValue?: boolean
}

export function RadialProgress({
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  className,
  status = 'success',
  showValue = true,
}: RadialProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const statusColors = {
    success: 'stroke-status-success',
    warning: 'stroke-status-warning',
    danger: 'stroke-status-danger',
  }

  return (
    <div className={cn('relative inline-flex', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn('transition-all duration-500 ease-out', statusColors[status])}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}
