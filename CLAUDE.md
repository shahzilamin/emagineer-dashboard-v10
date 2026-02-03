# Emagineer CEO Dashboard V10

## Project Context
CEO KPI dashboard for WellBefore.com ($10M DTC ecommerce) and D2C Builders ($2M 3PL).

Must pass the "30-second test" - CEO should know instantly:
- Are we winning or losing?
- What changed?
- What's at risk?
- What should I do next?

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts for visualizations
- Framer Motion for animations
- Deploy to Vercel

## Previous Version (V9) Features
- Command bar (⌘K)
- Time period selector (Today/WTD/MTD/QTD/YTD)
- Anomaly detection with AI insights
- Mobile-first responsive design
- Live refresh indicator
- Bento grid layout

## V10 New Features to Add
1. **Drill-down panels** - Click any metric to see breakdown (by product, channel, time)
2. **Comparison mode** - Compare current period vs previous (MTD vs last MTD)
3. **Goal tracking** - Visual progress toward monthly/quarterly targets
4. **Export functionality** - Download reports as PDF/CSV
5. **Dark/Light mode toggle** - User preference with system detection

## Key Metrics to Display

### WellBefore (DTC)
- Revenue (Today, WTD, MTD, YTD)
- Gross Margin (target: 52-56%)
- Contribution Margin (target: 25%+)
- CAC and CAC Payback
- LTV:CAC Ratio
- Net Sales Ratio (target: 90%)
- EBITDA (target: 5-7%)

### D2C Builders (3PL)
- Perfect Order Rate (target: >98%)
- Order Cycle Time
- Dock-to-Stock Time (<24h)
- Pick Accuracy (>99.99%)
- Space Utilization
- Revenue per Sq Ft

## Design Guidelines
- Clean, modern, executive-level aesthetic
- No clutter - every element must earn its space
- Color-coded status (green/yellow/red for health)
- Subtle animations, nothing distracting
- Mobile-first but excellent on desktop

## Deployment
After build, will deploy to Vercel and push to GitHub (shahzilamin/emagineer-dashboard-v10)
