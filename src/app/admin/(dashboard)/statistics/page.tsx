import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AdminStatisticsCards } from './_components/admin-statistics-cards'
import { GetAllProductsCount } from '../_actions/GetAllProductsCount'
import { AdminStatisticsData } from './admin.statistics.data'
import { AdminStatisticsCharts } from './_components/admin-statistics-charts'

// Sample data
const topProductsData = [
  { name: 'Arroz', sales: 4200, revenue: 12600 },
  { name: 'Feijão', sales: 3800, revenue: 11400 },
  { name: 'Óleo', sales: 3200, revenue: 9600 },
  { name: 'Leite', sales: 2900, revenue: 8700 },
  { name: 'Pão', sales: 2400, revenue: 7200 },
]

const bottomProductsData = [
  { name: 'Caviar', sales: 45, revenue: 450 },
  { name: 'Mel', sales: 89, revenue: 445 },
  { name: 'Gengibre', sales: 123, revenue: 369 },
  { name: 'Açúcar', sales: 234, revenue: 702 },
  { name: 'Sal', sales: 256, revenue: 512 },
]

const topSellersData = [
  { name: 'João Silva', sales: 2400, products: 45 },
  { name: 'Maria Santos', sales: 2210, products: 38 },
  { name: 'Pedro Costa', sales: 2029, products: 41 },
  { name: 'Ana Oliveira', sales: 1980, products: 35 },
  { name: 'Carlos Ferreira', sales: 1891, products: 32 },
]

const trendData = [
  { date: '1 Jan', sales: 4000, revenue: 12000, customers: 240 },
  { date: '4 Jan', sales: 3000, revenue: 9000, customers: 221 },
  { date: '7 Jan', sales: 2000, revenue: 6000, customers: 229 },
  { date: '10 Jan', sales: 2780, revenue: 8340, customers: 200 },
  { date: '13 Jan', sales: 1890, revenue: 5670, customers: 218 },
  { date: '16 Jan', sales: 2390, revenue: 7170, customers: 250 },
  { date: '19 Jan', sales: 3490, revenue: 10470, customers: 210 },
]

const storesData = [
  { name: 'Mercearia Centro', sales: 8900, receita: 26700 },
  { name: 'Mercearia Vila', sales: 7650, receita: 22950 },
  { name: 'Mercearia Praia', sales: 6200, receita: 18600 },
  { name: 'Mercearia Norte', sales: 5240, receita: 15720 },
  { name: 'Mercearia Sul', sales: 4100, receita: 12300 },
]

export default async function AdminStatisticsPage() {
  // const [timeFilter, setTimeFilter] = useState('7days')

  const { 
    allProductsCount,
    allSales,
    totalRevenue,
    bestSellerGroceries,
    last30DaysData
   } = await AdminStatisticsData();

  const allSalesCount = allSales.length ?? 0;
  const totalRevenues = Number(totalRevenue) ?? 0;
  console.log(bestSellerGroceries)

  const bestSellerData = bestSellerGroceries.map((item) =>({
    name: item.name,
    revenue: Number(item.revenue),
    totalSalesCount: Number(item.sales)
  }));

  const last30Days = last30DaysData.map((item) =>({
    date: new Date(item.date).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long"
    }),
    revenue: Number(item.totalRevenue),
    sales: Number(item.salesCount)
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Estatísticas📊</h1>
        <p className="text-muted-foreground">Analise de desempenho e métricas do sistema</p>
      </div>

      {/* <div className="flex gap-2">
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

      {/* KPI Cards */}
      <AdminStatisticsCards
      allProductsCount={allProductsCount}
      allSalesCount={allSalesCount}
      totalRevenue={totalRevenues}
      />

     <AdminStatisticsCharts
     BestSellerGroceriesData={bestSellerData}
     Last30DaysData={last30Days}
     />

      {/* <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Procurados</CardTitle>
            <CardDescription>Análise detalhada dos melhores produtos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProductsData.map((product, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} unidades vendidas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R$ {product.revenue.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance de Vendedores</CardTitle>
            <CardDescription>Estatísticas dos principais vendedores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellersData.map((seller, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{seller.name}</p>
                    <p className="text-sm text-muted-foreground">{seller.products} produtos vendidos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R$ {seller.sales.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
