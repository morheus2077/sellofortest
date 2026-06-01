import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import AdminDashboardChart from "./dashboard-client"
import { RecentTransactions } from "@/app/admin/(dashboard)/_components/recent-transactions"
import { DashboardResumeCards } from "./dashboard-resume-cards"
import { fetchDashboardData } from "./dashboard.data"

export default async function DashboardPage() {

  const {
    users,
    groceries,
    recentSales,
    revenuesByMonth,
    todaySalesCount,
    todayRevenue,
  } = await fetchDashboardData();

  const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
]

  const formatted = revenuesByMonth.map((item) => ({
    name: months[item.month - 1],
    total: Number(item.total)
  }))

  const usersCount = users.length;
  const groceriesCount = groceries?.length;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard do administrador</h1>
        <p className="text-muted-foreground">Estatistícas e performance da aplicação📊🚀</p>
      </div>

      <DashboardResumeCards 
      usersCount={usersCount} 
      groceriesCount={groceriesCount} 
      todaySalesCount={todaySalesCount}
      todayRevenue={todayRevenue}
      />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão geral das receitas</CardTitle>
            <CardDescription>Volume das receitas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminDashboardChart data={formatted} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Vendas recentes</CardTitle>
            <CardDescription>Últimas vendas na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions recentSales={recentSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

