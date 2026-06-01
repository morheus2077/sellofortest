'use client'

import dynamic from 'next/dynamic'

const AdminDashboardChart = dynamic<{
  data: { name: string; total: number }[]
}>(
  () => import('@/app/admin/(dashboard)/_components/admin-dashboard-chart').then(mod => mod.AdminDashboardChart),
  { ssr: false }
)

export default AdminDashboardChart