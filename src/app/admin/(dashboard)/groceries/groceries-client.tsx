"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GroceriesTable, Grocery } from "./groceries-table"
import { GroceryProps } from "../_actions/GetGroceriesActions"

interface Props {
  groceries: GroceryProps[] | undefined
}

export function GroceriesClient({ groceries }: Props) {
  const [search, setSearch] = useState("")

  const filteredGroceries = useMemo(() => {
    return groceries?.filter((grocery) =>
      grocery.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, groceries])

  return (
    <>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mx-5 ">
            <div className="flex items-center gap-3 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              placeholder="Pesquisar mercearias..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" variant="outline" size="sm">
                Exportar em PDF <File/>
              </Button>
            </div>
          </div>

      <GroceriesTable 
      groceries={filteredGroceries} />
    </>
  )
}