'use client'

import { Header } from '@/components/layout/Header'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { CashRunway } from '@/components/dashboard/CashRunway'
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

      <main className="container mx-auto px-4 py-8">
        {/* CASH IS OXYGEN - The Hero Metric */}
        <CashRunway businessUnit={businessUnit} />

        {/* CEO Daily Briefing */}
        <DailyBriefing
          metrics={metrics}
          businessUnit={businessUnit}
          timePeriod={timePeriod}
          onMetricClick={openDrilldown}
        />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {businessUnit === 'wellbefore' ? 'WellBefore' : 'D2C Builders'} Overview
          </h2>
          <p className="text-muted-foreground">
            {timePeriod === 'today'
              ? "Today's"
              : timePeriod === 'wtd'
              ? 'Week to Date'
              : timePeriod === 'mtd'
              ? 'Month to Date'
              : timePeriod === 'qtd'
              ? 'Quarter to Date'
              : 'Year to Date'}{' '}
            performance metrics
          </p>
        </motion.div>

        {/* Primary Metrics - Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Secondary Metrics */}
        {secondaryMetrics.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold mb-4"
            >
              Additional Metrics
            </motion.h3>
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
          </>
        )}
      </main>

      {/* Drilldown Panel */}
      <DrilldownPanel metric={selectedMetric} drilldown={selectedDrilldown} />

      {/* Command Bar */}
      <CommandBar />
    </div>
  )
}
