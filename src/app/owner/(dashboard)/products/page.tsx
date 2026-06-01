import { CreateProductDialog } from "./create-product-dialog"
import { ProductsClient } from "./products-client"
import { AddStockDialog } from "./add-stock-dialog."
import { fecthOwnerProductsData } from "./owner.products.data"

export const metadata = {
  title: "Gerenciar produtos",
  description: "Sello - Sistema de gerenciamento de mercearias",
}

export default async function Products() {

  const { 
    products,
    categories
   } = await fecthOwnerProductsData();
 
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 id="p-title" className="text-2xl md:text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie todo o seu estoque de produtos.</p>
        </div>
        <div className="flex gap-4 items-center">
          <AddStockDialog 
          products={products}/>
          
          <CreateProductDialog 
          categories={categories}/>
        </div>
      </div>
          <div className="w-full min-w-[640px]">
            <ProductsClient 
            products={products}
            categories={categories}
            />
          </div>
    </div>
  )
}
