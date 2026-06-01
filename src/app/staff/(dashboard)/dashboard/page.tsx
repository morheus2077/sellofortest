import { StaffResumeCards } from "../_components/staff-resume-cards"
import { StockAlertTable } from "../../../../components/stock-alert-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StaffDashboardChart from "./staff-dashboard-client"
import { fetchStaffDashboardData } from "./staff.dashboard.data";

export default async function SatffDashboardPage() {
 
  const { 
    last7DaysRevenues,
    products,
    todayRevenue,
    todaySalesCount,
    todaySoldProducts
   } = await fetchStaffDashboardData();

  const days = [
  "Seg","Ter","Qua","Qui","Sex","Sab",
  ]

  const formattedLast7Days = last7DaysRevenues.map(item => ({
  name: new Date(item.date).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
  }),
  total: Number(item.total)
}));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Painel do Gerente de vendas</h1>
        <p className="text-muted-foreground">Estatistícas e movimentos em tempo real.</p>
      </div>

      <StaffResumeCards
      todaySoldProducts={todaySoldProducts}
      todaySalesCount={todaySalesCount}
      todayRevenue={todayRevenue}
      />
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Visão geral das receitas 📊</CardTitle>
          <CardDescription>Volume das receitas nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <StaffDashboardChart data={formattedLast7Days} />
          </CardContent>
        </Card>    
      <h1 className="mt-10 text-2xl md:text-3xl font-bold tracking-tight">🚨 Alertas de estoque</h1>
      <StockAlertTable
      products={products}
      />
    </div>
  )
}

