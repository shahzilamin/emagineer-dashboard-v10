import { format, formatDistanceToNow } from 'date-fns'

export function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
  }

  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(value: number, compact = false): string {
  if (compact) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
  }

  return new Intl.NumberFormat('en-US').format(value)
}

export function formatRatio(value: number): string {
  return `${value.toFixed(1)}:1`
}

export function formatTime(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`
  }
  if (hours < 24) {
    return `${hours.toFixed(1)}h`
  }
  return `${(hours / 24).toFixed(1)}d`
}

export function formatMonths(months: number): string {
  if (months < 1) {
    return `${Math.round(months * 30)}d`
  }
  return `${months.toFixed(1)}mo`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM d, yyyy')
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function formatChange(current: number, previous: number): {
  value: number
  formatted: string
  direction: 'up' | 'down' | 'flat'
} {
  if (previous === 0) {
    return { value: 0, formatted: '0%', direction: 'flat' }
  }

  const change = ((current - previous) / previous) * 100
  const direction = change > 0.5 ? 'up' : change < -0.5 ? 'down' : 'flat'
  const sign = change > 0 ? '+' : ''

  return {
    value: change,
    formatted: `${sign}${change.toFixed(1)}%`,
    direction,
  }
}

export function getStatusFromValue(
  value: number,
  target: { min?: number; max?: number; optimal?: number },
  higherIsBetter = true
): 'success' | 'warning' | 'danger' {
  if (target.optimal !== undefined) {
    const diff = Math.abs(value - target.optimal)
    const tolerance = target.optimal * 0.05
    if (diff <= tolerance) return 'success'
    if (diff <= tolerance * 2) return 'warning'
    return 'danger'
  }

  if (target.min !== undefined && target.max !== undefined) {
    if (value >= target.min && value <= target.max) return 'success'
    if (value >= target.min * 0.95 && value <= target.max * 1.05) return 'warning'
    return 'danger'
  }

  if (target.min !== undefined) {
    if (value >= target.min) return 'success'
    if (value >= target.min * 0.9) return 'warning'
    return 'danger'
  }

  if (target.max !== undefined) {
    if (value <= target.max) return 'success'
    if (value <= target.max * 1.1) return 'warning'
    return 'danger'
  }

  return 'success'
}
