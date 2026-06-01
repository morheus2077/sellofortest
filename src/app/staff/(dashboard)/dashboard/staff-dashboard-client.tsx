'use client'

import dynamic from 'next/dynamic'

const StaffDashboardChart = dynamic<{
  data: { name: string; total: number }[]
}>(
  () => import('@/app/staff/(dashboard)/_components/staff-dashboard-chart').then(mod => mod.StaffDashboardChart),
  { ssr: false }
)

export default StaffDashboardChart