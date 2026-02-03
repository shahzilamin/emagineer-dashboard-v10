'use client'

import { Sheet } from '@/components/ui/Sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { ProductBreakdown } from './ProductBreakdown'
import { ChannelBreakdown } from './ChannelBreakdown'
import { TimeBreakdown } from './TimeBreakdown'
import { MetricDrilldown, Metric } from '@/types'
import { useDashboardStore } from '@/store/dashboardStore'
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters'

interface DrilldownPanelProps {
  metric: Metric | undefined
  drilldown: MetricDrilldown | undefined
}

export function DrilldownPanel({ metric, drilldown }: DrilldownPanelProps) {
  const { drilldownOpen, closeDrilldown } = useDashboardStore()

  if (!metric || !drilldown) {
    return null
  }

  const formatValue = (value: number) => {
    switch (metric.format) {
      case 'currency':
        return formatCurrency(value, true)
      case 'percent':
        return formatPercent(value)
      default:
        return formatNumber(value, true)
    }
  }

  return (
    <Sheet
      open={drilldownOpen}
      onClose={closeDrilldown}
      title={drilldown.metricLabel}
      description={`Breakdown and analysis`}
    >
      <div className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">
            {formatValue(drilldown.totalValue)}
          </span>
          {metric.changeFormatted && metric.trend && (
            <span
              className={`text-sm font-medium ${
                metric.trend === 'up'
                  ? metric.higherIsBetter
                    ? 'text-status-success'
                    : 'text-status-danger'
                  : metric.trend === 'down'
                  ? metric.higherIsBetter
                    ? 'text-status-danger'
                    : 'text-status-success'
                  : 'text-muted-foreground'
              }`}
            >
              {metric.changeFormatted}
            </span>
          )}
        </div>

        <Tabs defaultValue="product">
          <TabsList className="w-full justify-start">
            {drilldown.byProduct && <TabsTrigger value="product">By Product</TabsTrigger>}
            {drilldown.byChannel && <TabsTrigger value="channel">By Channel</TabsTrigger>}
            {drilldown.byTime && <TabsTrigger value="time">By Time</TabsTrigger>}
          </TabsList>

          {drilldown.byProduct && (
            <TabsContent value="product">
              <ProductBreakdown
                data={drilldown.byProduct}
                format={metric.format}
              />
            </TabsContent>
          )}

          {drilldown.byChannel && (
            <TabsContent value="channel">
              <ChannelBreakdown
                data={drilldown.byChannel}
                format={metric.format}
              />
            </TabsContent>
          )}

          {drilldown.byTime && (
            <TabsContent value="time">
              <TimeBreakdown
                data={drilldown.byTime}
                format={metric.format}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Sheet>
  )
}
