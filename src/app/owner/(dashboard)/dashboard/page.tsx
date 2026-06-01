// import { StaffResumeCards } from "../components/staff-resume-cards"
import { StockAlertTable } from "../../../../components/stock-alert-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOwnerDashboardData } from "./owner.dashboard.data";
import { OwnerResumeCards } from "../_components/owner-resume-cards";
import { OwnerDashboardChart } from "../_components/owner-dashboard-chart";

export default async function OwnerDashboardPage() {
 
  const { 
    products,
    last7DaysRevenues,
    todayGrocerySoldProducts,
    todayGrocerySalesCount,
    todayGroceryRevenue
   } = await fetchOwnerDashboardData();

  const lowStockProducts = products.filter((
    p => p.inStock < p.minimumStock
  )).length;

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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Painel do proprietário</h1>
        <p className="text-muted-foreground">Estatistícas e movimentos em tempo real da sua mercearia.</p>
      </div>

      <OwnerResumeCards
      todayGrocerySoldProducts={todayGrocerySoldProducts}
      todayGroceryRevenue={todayGroceryRevenue}
      todayGrocerySalesCount={todayGrocerySalesCount}
      lowStockProductsCount={lowStockProducts}
      />
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Visão geral das receitas 📊</CardTitle>
          <CardDescription>Volume das receitas nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OwnerDashboardChart data={formattedLast7Days} />
          </CardContent>
        </Card>    
      <h1 className="mt-10 text-2xl md:text-3xl font-bold tracking-tight">🚨 Alertas de estoque</h1>
      <StockAlertTable
      products={products}
      />
    </div>
  )
}

