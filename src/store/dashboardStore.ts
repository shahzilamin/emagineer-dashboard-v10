import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BusinessUnit, TimePeriod, Metric, MetricDrilldown } from '@/types'
import { getDashboardData } from '@/data/mockData'

interface DashboardState {
  businessUnit: BusinessUnit
  timePeriod: TimePeriod
  comparisonMode: boolean
  selectedMetricId: string | null
  drilldownOpen: boolean
  commandBarOpen: boolean
  lastUpdated: string
  metrics: Metric[]
  drilldowns: Record<string, MetricDrilldown>

  setBusinessUnit: (unit: BusinessUnit) => void
  setTimePeriod: (period: TimePeriod) => void
  toggleComparisonMode: () => void
  openDrilldown: (metricId: string) => void
  closeDrilldown: () => void
  toggleCommandBar: () => void
  setCommandBarOpen: (open: boolean) => void
  refreshData: () => void
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      businessUnit: 'wellbefore',
      timePeriod: 'mtd',
      comparisonMode: false,
      selectedMetricId: null,
      drilldownOpen: false,
      commandBarOpen: false,
      lastUpdated: new Date().toISOString(),
      metrics: getDashboardData('wellbefore', 'mtd').metrics,
      drilldowns: getDashboardData('wellbefore', 'mtd').drilldowns,

      setBusinessUnit: (unit) => {
        const data = getDashboardData(unit, get().timePeriod)
        set({
          businessUnit: unit,
          metrics: data.metrics,
          drilldowns: data.drilldowns,
          lastUpdated: new Date().toISOString(),
        })
      },

      setTimePeriod: (period) => {
        const data = getDashboardData(get().businessUnit, period)
        set({
          timePeriod: period,
          metrics: data.metrics,
          drilldowns: data.drilldowns,
          lastUpdated: new Date().toISOString(),
        })
      },

      toggleComparisonMode: () => {
        set((state) => ({ comparisonMode: !state.comparisonMode }))
      },

      openDrilldown: (metricId) => {
        set({ selectedMetricId: metricId, drilldownOpen: true })
      },

      closeDrilldown: () => {
        set({ drilldownOpen: false })
      },

      toggleCommandBar: () => {
        set((state) => ({ commandBarOpen: !state.commandBarOpen }))
      },

      setCommandBarOpen: (open) => {
        set({ commandBarOpen: open })
      },

      refreshData: () => {
        const { businessUnit, timePeriod } = get()
        const data = getDashboardData(businessUnit, timePeriod)
        set({
          metrics: data.metrics,
          drilldowns: data.drilldowns,
          lastUpdated: new Date().toISOString(),
        })
      },
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        businessUnit: state.businessUnit,
        timePeriod: state.timePeriod,
        comparisonMode: state.comparisonMode,
      }),
    }
  )
)
