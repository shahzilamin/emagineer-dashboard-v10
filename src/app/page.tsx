'use client'

import { Header } from '@/components/layout/Header'
import { ExecutiveHero } from '@/components/dashboard/ExecutiveHero'
import { TargetProgressBar } from '@/components/dashboard/TargetProgressBar'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { DailyBriefing } from '@/components/dashboard/DailyBriefing'
import { DrilldownPanel } from '@/components/drilldown/DrilldownPanel'
import { CommandBar } from '@/components/commands/CommandBar'
import { useDashboardStore } from '@/store/dashboardStore'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const {
    businessUnit,
    timePeriod,
    comparisonMode,
    metrics,
    drilldowns,
    selectedMetricId,
    openDrilldown,
  } = useDashboardStore()

  const selectedMetric = metrics.find((m) => m.id === selectedMetricId)
  const selectedDrilldown = selectedMetricId ? drilldowns[selectedMetricId] : undefined

  // Group metrics for layout
  const primaryMetrics = metrics.slice(0, 4)
  const secondaryMetrics = metrics.slice(4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* EXECUTIVE HERO - Gradient header with health score (shopify-forecast style) */}
        <ExecutiveHero businessUnit={businessUnit} />

        {/* TARGET PROGRESS BAR - 5-column with Finaloop benchmarks */}
        <TargetProgressBar businessUnit={businessUnit} />

        {/* CEO DAILY BRIEFING - What needs attention */}
        <DailyBriefing
          metrics={metrics}
          businessUnit={businessUnit}
          timePeriod={timePeriod}
          onMetricClick={openDrilldown}
        />

        {/* DETAILED METRICS - Dive deeper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryMetrics.map((metric, index) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                onClick={() => openDrilldown(metric.id)}
                showComparison={comparisonMode}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* ADDITIONAL METRICS */}
        {secondaryMetrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Additional Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondaryMetrics.map((metric, index) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  onClick={() => openDrilldown(metric.id)}
                  showComparison={comparisonMode}
                  index={index + 4}
                />
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Drilldown Panel */}
      <DrilldownPanel metric={selectedMetric} drilldown={selectedDrilldown} />

      {/* Command Bar */}
      <CommandBar />
    </div>
  )
}
