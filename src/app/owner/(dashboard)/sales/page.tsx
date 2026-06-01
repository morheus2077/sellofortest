import { CreateSaleDialog } from "./create-sale-dialog"
import { SalesClient } from "./sales-client"
import { ExportPdfButton } from "@/components/export-pdf-button"
import { fetchOwnerSalesData } from "./owner.sales.data"

export const metadata = {
  title: "Gerenciar vendas",
  description: "Sistema de gerenciamento de mercearias",
}

export default async function OwnerSales() {

  const { 
    sales,
    products
   } = await fetchOwnerSalesData()

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Vendas📈</h1>
          <p className="text-muted-foreground">Gerencie todas as suas vendas de forma simples e eficiente.</p>
        </div>
        <ExportPdfButton/>
        <div className="flex gap-4 items-center">
          <CreateSaleDialog products={products}  />
        </div>
      </div>
          <div className="w-full min-w-[640]">
            <SalesClient
            sales={sales}
            />
          </div>
    </div>
  )
}
