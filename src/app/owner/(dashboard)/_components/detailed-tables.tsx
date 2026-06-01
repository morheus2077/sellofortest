import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const topProductsData = [
  { name: 'Arroz', sales: 4200, revenue: 12600 },
  { name: 'Feijão', sales: 3800, revenue: 11400 },
  { name: 'Óleo', sales: 3200, revenue: 9600 },
  { name: 'Leite', sales: 2900, revenue: 8700 },
  { name: 'Pão', sales: 2400, revenue: 7200 },
]

const topSellersData = [
  { name: 'João Silva', sales: 2400, products: 45 },
  { name: 'Maria Santos', sales: 2210, products: 38 },
  { name: 'Pedro Costa', sales: 2029, products: 41 },
  { name: 'Ana Oliveira', sales: 1980, products: 35 },
  { name: 'Carlos Ferreira', sales: 1891, products: 32 },
]

interface MostSoldProps {
  name: string,
  quantity: number,
  totalRevenue: number
}
export function DetailedTables({ MostSoldData }: { MostSoldData: MostSoldProps[]}){
    return(
    <>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Procurados</CardTitle>
            <CardDescription>Análise detalhada dos melhores produtos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MostSoldData.map((product, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.quantity} unidades vendidas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">MZN {product.totalRevenue.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* <Card>
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
                    <p className="font-semibold">MZN {seller.sales.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </>
    )
}