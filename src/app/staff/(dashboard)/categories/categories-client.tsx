"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search, File, ArrowBigUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Category, Product } from "@/types/types"
import { CategoriesTable } from "./categories-table"

interface Props {
  categories: Category[] | undefined
}

export function CategoriesClient({ categories }: Props) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories?.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, categories]);

  return (
    <>
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mx-5 ">
      <div className="flex items-center gap-3 w-full max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
         value={search}
         onChange={(e)=>{setSearch(e.target.value)}}
         placeholder="Pesquisar categorias..." className="h-9" />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button 
        className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 cursor-pointer" 
        variant="outline" 
        size="sm">
          Exportar em PDF 
          <File/>
        </Button>
      </div>
    </div>
      <CategoriesTable
      categories={filteredCategories}
      />
    </>
  )
}