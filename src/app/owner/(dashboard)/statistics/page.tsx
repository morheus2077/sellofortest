// import { useState } from 'react'
import { StatisticksResumeCards } from '../_components/statistics-resume-cards'
import { StatisticsCharts } from '../_components/statistics-charts'
import { DetailedTables } from '../_components/detailed-tables'
import { fetchOwnerStatisticsData } from './statistics.data'


export default async function OwmerStatisticsPage() {
  // const [timeFilter, setTimeFilter] = useState('7days')

  const { 
    groceryProducts,
    groceryAllSoldProducts,
    groceryAllSales,
    groceryTotalRevenues,
    groceryMostSoldData,
    groceryLeastSoldData,
    groceryLast30DaysData
   } = await fetchOwnerStatisticsData();

  const productsCount = groceryProducts.length;
  const allSoldProductsCount = groceryAllSoldProducts ?? 0;
  const allSalesCount = groceryAllSales ?? 0;
  const totalRevenues = groceryTotalRevenues ?? 0;

  

  const mostSold = groceryMostSoldData.map((item) => ({
    name: item.name,
    total: Number(item.quantity)
  }))

  const leastSold = groceryLeastSoldData.map((item) =>({
    name: item.name as string,
    total: Number(item.quantity)
  }))

  const last30Days = groceryLast30DaysData.map((item) =>({
    date: new Date(item.date).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long"
    }),
    revenue: Number(item.totalRevenue),
    salesCount: Number(item.salesCount)
  }))

  const MostSoldTable = groceryMostSoldData.map((item)=>({
    name: item.name,
    quantity: Number(item.quantity),
    totalRevenue: Number(item.total_revenue)
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Estatísticas📊</h1>
        <p className="text-muted-foreground">Analise de desempenho e métricas da sua mercearia</p>
      </div>

      {/* Time Filter
      <div className="flex gap-2">
        <Button 
          variant={timeFilter === 'today' ? 'default' : 'outline'} 
          onClick={() => setTimeFilter('today')}
        >
          Hoje
        </Button>
        <Button 
          variant={timeFilter === '7days' ? 'default' : 'outline'} 
          onClick={() => setTimeFilter('7days')}
        >
          7 Dias
        </Button>
        <Button 
          variant={timeFilter === '30days' ? 'default' : 'outline'} 
          onClick={() => setTimeFilter('30days')}
        >
          30 Dias
        </Button>
      </div> */}

    <StatisticksResumeCards 
    groceryProductsCount={productsCount}
    groceryAllSoldProductsCount={allSoldProductsCount}
    groceryAllSalesCount={allSalesCount}
    groceryTotalRevenues={totalRevenues}
    />
    <StatisticsCharts
    mostSoldData={mostSold}
    leastSoldData={leastSold}
    last30DaysData={last30Days}
    />
    <DetailedTables
    MostSoldData={MostSoldTable}
    />
    </div>
  )
}
