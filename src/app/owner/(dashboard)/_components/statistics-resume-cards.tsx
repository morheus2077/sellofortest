import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  groceryProductsCount: number,
  groceryAllSoldProductsCount: number,
  groceryAllSalesCount: number,
  groceryTotalRevenues: number
}

export function StatisticksResumeCards({ 
  groceryProductsCount, 
  groceryAllSoldProductsCount, 
  groceryAllSalesCount,
  groceryTotalRevenues
}: Props){

    return(
        <>
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtos cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groceryProductsCount}</div>
            {/* <p className="text-xs text-muted-foreground">+12% do mês anterior</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groceryAllSoldProductsCount}</div>
            {/* <p className="text-xs text-muted-foreground">+8% comparado a semana passada</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de vendas realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groceryAllSalesCount}</div>
            {/* <p className="text-xs text-muted-foreground">+5% de aumento</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MZN {groceryTotalRevenues}</div>
            {/* <p className="text-xs text-muted-foreground">+15% do período anterior</p> */}
          </CardContent>
        </Card>
      </div>
        </>
    )
}