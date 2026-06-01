import { CreateCategoryDialog } from "./create-category-dialog"
import { CategoriesClient } from "./categories-client"
import { GetCategories } from "@/lib/_actions/products/GetCategoriesAction"

export const metadata = {
  title: "Gerenciar categorias",
  description: "Sello - Sistema de gerenciamento de mercearias",
}

export default async function Categories() {

  const categories = await GetCategories();
 
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 id="p-title" className="text-2xl md:text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="text-muted-foreground">Gerencie todas as suas categorias.</p>
        </div>
        <div className="flex gap-4 items-center">
          
          <CreateCategoryDialog />
        </div>
      </div>
          <div className="w-full min-w-[640px]">
            <CategoriesClient 
            categories={categories}
            />
          </div>
    </div>
  )
}
