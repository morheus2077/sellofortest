'use client'
import { BarChart, Bar,  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BestSellerTooltip } from './best-seller-tooltip'

interface BestSellerGroceriesProps{
  name: string,
  revenue: number,
  totalSalesCount: number
}

interface Last30DaysProps {
  date: string,
  revenue: number,
  sales: number
}

export function AdminStatisticsCharts({ BestSellerGroceriesData, Last30DaysData }: { BestSellerGroceriesData: BestSellerGroceriesProps[], Last30DaysData: Last30DaysProps[] }){

    return(
 <div className="grid gap-4 md:grid-cols-2">
        {/* Top Products */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>Top 5 produtos por volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Products */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Produtos Menos Vendidos</CardTitle>
            <CardDescription>Bottom 5 produtos por volume de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */} 

        {/* Top Stores */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Mercearias que Mais Vendem</CardTitle>
            <CardDescription>Receita por unidade (Top 5)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={BestSellerGroceriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<BestSellerTooltip />} />
                
                <Bar dataKey="revenue" name="Receita" fill="#06b6d4" />

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
              <LineChart data={Last30DaysData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="Vendas" />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Receita MZN" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Sellers */}
        {/* <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Melhores Vendedores</CardTitle>
            <CardDescription>Top 5 vendedores por volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="sales" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>
    )
}