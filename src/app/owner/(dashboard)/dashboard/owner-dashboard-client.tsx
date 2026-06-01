'use client'

import dynamic from 'next/dynamic'

const OwnerDashboardChart = dynamic<{
  data: { name: string; total: number }[]
}>(
  () => import('@/app/owner/(dashboard)/_components/owner-dashboard-chart').then(mod => mod.OwnerDashboardChart),
  { ssr: false }
)

export default OwnerDashboardChart