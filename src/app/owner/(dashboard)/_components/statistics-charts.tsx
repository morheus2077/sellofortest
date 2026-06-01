'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart } from 'recharts'


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

const trendData = [
  { date: '1 Jan', sales: 4000, revenue: 12000, customers: 240 },
  { date: '4 Jan', sales: 3000, revenue: 9000, customers: 221 },
  { date: '7 Jan', sales: 2000, revenue: 6000, customers: 229 },
  { date: '10 Jan', sales: 2780, revenue: 8340, customers: 200 },
  { date: '13 Jan', sales: 1890, revenue: 5670, customers: 218 },
  { date: '16 Jan', sales: 2390, revenue: 7170, customers: 250 },
  { date: '19 Jan', sales: 3490, revenue: 10470, customers: 210 },
]

interface ChartData {
  name: string
  total: number
}

interface LineChartData {
  date: string,
  revenue: number,
  salesCount: number
}

export function StatisticsCharts({ mostSoldData, leastSoldData, last30DaysData }: { mostSoldData: ChartData[], leastSoldData: ChartData[], last30DaysData: LineChartData[]} ){

    return(
        <>
      <div className="flex flex-col gap-4">
        <Card className='overflow-x-auto'>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          <CardDescription>Top 5 produtos por volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mostSoldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Menos Vendidos</CardTitle>
            <CardDescription>Top 5 produtos menos vendidos por volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leastSoldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tendência de Vendas e Receita</CardTitle>
            <CardDescription>Dados dos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={last30DaysData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="salesCount" stroke="#3b82f6" name="Vendas" />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Receita (Mzn)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
        </>       
    )
}