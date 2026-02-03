'use client'

import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { MetricStatus } from '@/types'

interface StatusBadgeProps {
  status: MetricStatus
  showIcon?: boolean
  label?: string
}

export function StatusBadge({ status, showIcon = true, label }: StatusBadgeProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      label: label || 'On Track',
    },
    warning: {
      icon: AlertCircle,
      label: label || 'At Risk',
    },
    danger: {
      icon: XCircle,
      label: label || 'Off Track',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={status} size="sm">
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  )
}
