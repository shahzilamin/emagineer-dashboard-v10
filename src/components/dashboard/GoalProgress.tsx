'use client'

import { RadialProgress } from '@/components/ui/Progress'
import { MetricGoal, MetricStatus } from '@/types'
import { cn } from '@/lib/cn'

interface GoalProgressProps {
  goal: MetricGoal
  className?: string
  size?: number
}

export function GoalProgress({ goal, className, size = 56 }: GoalProgressProps) {
  const percentage = (goal.current / goal.target) * 100
  const status: MetricStatus =
    percentage >= 100 ? 'success' :
    percentage >= 90 ? 'warning' : 'danger'

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <RadialProgress
        value={goal.current}
        max={goal.target}
        size={size}
        strokeWidth={5}
        status={status}
        showValue
      />
      <span className="text-xs text-muted-foreground">{goal.label}</span>
    </div>
  )
}
