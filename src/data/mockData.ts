import { DashboardData, Metric, MetricDrilldown, SparklineData } from '@/types'

function generateSparkline(baseValue: number, variance: number, points = 7): SparklineData[] {
  const data: SparklineData[] = []
  const today = new Date()

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const randomVariance = (Math.random() - 0.5) * 2 * variance
    data.push({
      value: baseValue + randomVariance,
      date: date.toISOString().split('T')[0],
    })
  }

  return data
}

export const wellbeforeMetrics: Metric[] = [
  {
    id: 'wb-revenue',
    label: 'Revenue',
    value: 847234,
    previousValue: 798456,
    format: 'currency',
    trend: 'up',
    change: 6.1,
    changeFormatted: '+6.1%',
    status: 'success',
    goal: {
      target: 833333,
      current: 847234,
      label: 'Monthly Goal',
    },
    sparkline: generateSparkline(120000, 15000),
    higherIsBetter: true,
    description: 'Total revenue for the period',
  },
  {
    id: 'wb-gross-margin',
    label: 'Gross Margin',
    value: 54.2,
    previousValue: 53.1,
    format: 'percent',
    trend: 'up',
    change: 1.1,
    changeFormatted: '+1.1%',
    status: 'success',
    target: { min: 52, max: 56 },
    goal: {
      target: 54,
      current: 54.2,
      label: 'Target Range',
    },
    sparkline: generateSparkline(54, 2),
    higherIsBetter: true,
    description: 'Gross margin percentage',
  },
  {
    id: 'wb-contribution-margin',
    label: 'Contribution Margin',
    value: 27.3,
    previousValue: 25.8,
    format: 'percent',
    trend: 'up',
    change: 1.5,
    changeFormatted: '+1.5%',
    status: 'success',
    target: { min: 25 },
    sparkline: generateSparkline(26, 2),
    higherIsBetter: true,
    description: 'Revenue minus variable costs',
  },
  {
    id: 'wb-cac',
    label: 'CAC',
    value: 34.50,
    previousValue: 38.20,
    format: 'currency',
    trend: 'down',
    change: -9.7,
    changeFormatted: '-9.7%',
    status: 'success',
    sparkline: generateSparkline(36, 4),
    higherIsBetter: false,
    description: 'Customer acquisition cost',
  },
  {
    id: 'wb-cac-payback',
    label: 'CAC Payback',
    value: 2.8,
    previousValue: 3.2,
    format: 'months',
    trend: 'down',
    change: -12.5,
    changeFormatted: '-12.5%',
    status: 'success',
    sparkline: generateSparkline(3, 0.5),
    higherIsBetter: false,
    description: 'Months to recover CAC',
  },
  {
    id: 'wb-ltv-cac',
    label: 'LTV:CAC Ratio',
    value: 4.2,
    previousValue: 3.8,
    format: 'ratio',
    trend: 'up',
    change: 10.5,
    changeFormatted: '+10.5%',
    status: 'success',
    target: { min: 3 },
    sparkline: generateSparkline(4, 0.5),
    higherIsBetter: true,
    description: 'Lifetime value to CAC ratio',
  },
  {
    id: 'wb-net-sales-ratio',
    label: 'Net Sales Ratio',
    value: 91.2,
    previousValue: 89.8,
    format: 'percent',
    trend: 'up',
    change: 1.4,
    changeFormatted: '+1.4%',
    status: 'success',
    target: { min: 90 },
    goal: {
      target: 90,
      current: 91.2,
      label: 'Target',
    },
    sparkline: generateSparkline(90, 2),
    higherIsBetter: true,
    description: 'Net sales after returns',
  },
  {
    id: 'wb-ebitda',
    label: 'EBITDA',
    value: 5.8,
    previousValue: 4.9,
    format: 'percent',
    trend: 'up',
    change: 0.9,
    changeFormatted: '+0.9%',
    status: 'warning',
    target: { min: 5, max: 7 },
    goal: {
      target: 6,
      current: 5.8,
      label: 'Target Range',
    },
    sparkline: generateSparkline(5.5, 1),
    higherIsBetter: true,
    description: 'Earnings before interest, taxes, depreciation, amortization',
  },
]

export const d2cBuildersMetrics: Metric[] = [
  {
    id: 'd2c-perfect-order',
    label: 'Perfect Order Rate',
    value: 98.7,
    previousValue: 98.2,
    format: 'percent',
    trend: 'up',
    change: 0.5,
    changeFormatted: '+0.5%',
    status: 'success',
    target: { min: 98 },
    goal: {
      target: 98,
      current: 98.7,
      label: 'Target',
    },
    sparkline: generateSparkline(98.5, 0.5),
    higherIsBetter: true,
    description: 'Orders delivered without issues',
  },
  {
    id: 'd2c-order-cycle',
    label: 'Order Cycle Time',
    value: 18.5,
    previousValue: 21.3,
    format: 'time',
    trend: 'down',
    change: -13.1,
    changeFormatted: '-13.1%',
    status: 'success',
    sparkline: generateSparkline(20, 3),
    higherIsBetter: false,
    description: 'Hours from order to ship',
  },
  {
    id: 'd2c-dock-to-stock',
    label: 'Dock-to-Stock',
    value: 18.2,
    previousValue: 22.5,
    format: 'time',
    trend: 'down',
    change: -19.1,
    changeFormatted: '-19.1%',
    status: 'success',
    target: { max: 24 },
    goal: {
      target: 24,
      current: 18.2,
      label: 'Max Hours',
    },
    sparkline: generateSparkline(20, 4),
    higherIsBetter: false,
    description: 'Hours from receipt to inventory',
  },
  {
    id: 'd2c-pick-accuracy',
    label: 'Pick Accuracy',
    value: 99.97,
    previousValue: 99.95,
    format: 'percent',
    trend: 'up',
    change: 0.02,
    changeFormatted: '+0.02%',
    status: 'success',
    target: { min: 99.99 },
    sparkline: generateSparkline(99.96, 0.02),
    higherIsBetter: true,
    description: 'Correct picks percentage',
  },
  {
    id: 'd2c-space-util',
    label: 'Space Utilization',
    value: 78.5,
    previousValue: 82.1,
    format: 'percent',
    trend: 'down',
    change: -3.6,
    changeFormatted: '-3.6%',
    status: 'warning',
    target: { min: 75, max: 85 },
    sparkline: generateSparkline(80, 5),
    higherIsBetter: true,
    description: 'Warehouse space usage',
  },
  {
    id: 'd2c-revenue-sqft',
    label: 'Revenue per Sq Ft',
    value: 42.30,
    previousValue: 39.80,
    format: 'currency',
    trend: 'up',
    change: 6.3,
    changeFormatted: '+6.3%',
    status: 'success',
    sparkline: generateSparkline(41, 3),
    higherIsBetter: true,
    description: 'Revenue efficiency',
  },
]

export const wellbeforeDrilldowns: Record<string, MetricDrilldown> = {
  'wb-revenue': {
    metricId: 'wb-revenue',
    metricLabel: 'Revenue',
    totalValue: 847234,
    byProduct: [
      { label: 'N95 Respirators', value: 287260, percentage: 33.9, change: 8.2, sku: 'N95-001', category: 'PPE' },
      { label: 'Surgical Masks', value: 211808, percentage: 25.0, change: 4.5, sku: 'SM-001', category: 'PPE' },
      { label: 'Nitrile Gloves', value: 169446, percentage: 20.0, change: 12.3, sku: 'NG-001', category: 'PPE' },
      { label: 'Hand Sanitizer', value: 101668, percentage: 12.0, change: -2.1, sku: 'HS-001', category: 'Hygiene' },
      { label: 'Face Shields', value: 50834, percentage: 6.0, change: 15.7, sku: 'FS-001', category: 'PPE' },
      { label: 'Other Products', value: 26218, percentage: 3.1, change: 1.2, sku: 'OTHER', category: 'Misc' },
    ],
    byChannel: [
      { label: 'Direct (wellbefore.com)', value: 423617, percentage: 50.0, change: 7.8, channel: 'direct' },
      { label: 'Amazon', value: 254170, percentage: 30.0, change: 5.2, channel: 'amazon' },
      { label: 'Walmart', value: 101668, percentage: 12.0, change: 3.9, channel: 'walmart' },
      { label: 'B2B / Wholesale', value: 67779, percentage: 8.0, change: 11.4, channel: 'b2b' },
    ],
    byTime: [
      { label: 'Week 1', value: 198234, percentage: 23.4, period: 'week', date: '2024-01-01' },
      { label: 'Week 2', value: 212456, percentage: 25.1, change: 7.2, period: 'week', date: '2024-01-08' },
      { label: 'Week 3', value: 224890, percentage: 26.5, change: 5.8, period: 'week', date: '2024-01-15' },
      { label: 'Week 4', value: 211654, percentage: 25.0, change: -5.9, period: 'week', date: '2024-01-22' },
    ],
  },
  'wb-gross-margin': {
    metricId: 'wb-gross-margin',
    metricLabel: 'Gross Margin',
    totalValue: 54.2,
    byProduct: [
      { label: 'N95 Respirators', value: 58.2, percentage: 0, change: 1.2, category: 'PPE' },
      { label: 'Surgical Masks', value: 52.8, percentage: 0, change: 0.8, category: 'PPE' },
      { label: 'Nitrile Gloves', value: 48.5, percentage: 0, change: 2.1, category: 'PPE' },
      { label: 'Hand Sanitizer', value: 61.2, percentage: 0, change: -0.5, category: 'Hygiene' },
      { label: 'Face Shields', value: 55.7, percentage: 0, change: 1.8, category: 'PPE' },
    ],
    byChannel: [
      { label: 'Direct', value: 62.5, percentage: 0, change: 0.9, channel: 'direct' },
      { label: 'Amazon', value: 45.2, percentage: 0, change: 1.5, channel: 'amazon' },
      { label: 'Walmart', value: 48.8, percentage: 0, change: 0.7, channel: 'walmart' },
      { label: 'B2B', value: 42.3, percentage: 0, change: 2.2, channel: 'b2b' },
    ],
  },
}

export const d2cBuildersDrilldowns: Record<string, MetricDrilldown> = {
  'd2c-perfect-order': {
    metricId: 'd2c-perfect-order',
    metricLabel: 'Perfect Order Rate',
    totalValue: 98.7,
    byProduct: [
      { label: 'Small Parcels', value: 99.2, percentage: 45, change: 0.3 },
      { label: 'Medium Boxes', value: 98.5, percentage: 35, change: 0.5 },
      { label: 'Large/Bulky', value: 97.8, percentage: 15, change: 0.8 },
      { label: 'Hazmat Items', value: 99.5, percentage: 5, change: 0.1 },
    ],
    byChannel: [
      { label: 'WellBefore Fulfillment', value: 98.9, percentage: 60, change: 0.4, channel: 'wellbefore' },
      { label: 'External Clients', value: 98.4, percentage: 40, change: 0.6, channel: 'external' },
    ],
  },
}

export function getDashboardData(
  businessUnit: 'wellbefore' | 'd2c-builders',
  timePeriod: string
): DashboardData {
  const isWellBefore = businessUnit === 'wellbefore'

  return {
    businessUnit,
    timePeriod: timePeriod as DashboardData['timePeriod'],
    lastUpdated: new Date().toISOString(),
    metrics: isWellBefore ? wellbeforeMetrics : d2cBuildersMetrics,
    drilldowns: isWellBefore ? wellbeforeDrilldowns : d2cBuildersDrilldowns,
  }
}

export function getComparisonData(metricId: string) {
  const currentMonth = [
    { date: '2024-01-01', label: 'Jan 1', value: 28500, previousValue: 26200 },
    { date: '2024-01-08', label: 'Jan 8', value: 31200, previousValue: 28900 },
    { date: '2024-01-15', label: 'Jan 15', value: 29800, previousValue: 27100 },
    { date: '2024-01-22', label: 'Jan 22', value: 33400, previousValue: 30500 },
    { date: '2024-01-29', label: 'Jan 29', value: 35100, previousValue: 31800 },
  ]

  return {
    current: {
      label: 'This Month',
      value: 847234,
      data: currentMonth,
    },
    previous: {
      label: 'Last Month',
      value: 798456,
      data: currentMonth.map((d) => ({ ...d, value: d.previousValue || 0 })),
    },
  }
}
