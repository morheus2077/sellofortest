'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
    allProductsCount: number,
    allSalesCount: number,
    totalRevenue: number
}

export function AdminStatisticsCards({ allProductsCount, allSalesCount, totalRevenue }: Props){

    return(
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allProductsCount}</div>
            {/* <p className="text-xs text-muted-foreground">+12% do mês anterior</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allSalesCount}</div>
            {/* <p className="text-xs text-muted-foreground">+8% comparado a semana passada</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mzn {totalRevenue}</div>
            {/* <p className="text-xs text-muted-foreground">+15% do período anterior</p> */}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 124,50</div>
            <p className="text-xs text-muted-foreground">+5% de aumento</p>
          </CardContent>
        </Card> */}
      </div>
    )
}