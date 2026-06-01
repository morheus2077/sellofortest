'use client'

import dynamic from 'next/dynamic'

const StatisticsCharts = dynamic<{
  mostSoldData: any[];
  leastSoldData: any[];
  last30DaysData: any[];
}>(
  () => import('@/app/owner/(dashboard)/_components/statistics-charts').then(mod => mod.StatisticsCharts),
  { ssr: false }
)

export default StatisticsCharts