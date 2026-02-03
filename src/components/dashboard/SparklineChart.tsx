'use client'

import { SparklineData } from '@/types'
import { cn } from '@/lib/cn'

interface SparklineChartProps {
  data: SparklineData[]
  width?: number
  height?: number
  className?: string
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

export function SparklineChart({
  data,
  width = 100,
  height = 32,
  className,
  color = 'primary',
}: SparklineChartProps) {
  if (!data || data.length < 2) {
    return null
  }

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const padding = 2
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth
    const y = padding + chartHeight - ((d.value - min) / range) * chartHeight
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`

  const colorClasses = {
    primary: 'stroke-primary fill-primary/10',
    success: 'stroke-status-success fill-status-success/10',
    warning: 'stroke-status-warning fill-status-warning/10',
    danger: 'stroke-status-danger fill-status-danger/10',
  }

  return (
    <svg
      width={width}
      height={height}
      className={cn('overflow-visible', className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polygon
        points={areaPoints}
        className={cn(colorClasses[color])}
        strokeWidth="0"
      />
      <polyline
        points={points}
        fill="none"
        className={cn(colorClasses[color])}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
