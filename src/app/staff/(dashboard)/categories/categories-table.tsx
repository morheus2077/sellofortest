"use client"

import { Badge } from "../../../../components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Category } from "@/types/types"
import { Dialog } from "radix-ui"
import { EditCategoryDialog } from "./edit-category-dialog"

interface CategoriesTableProps {
  categories: Category[] | undefined | null;
}

export function CategoriesTable({ categories }: CategoriesTableProps) {

const [localCategories, setLocalCategories] = useState(categories || [])
const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

function handleStatusChange(id: string, status: string) {
  setLocalCategories(prev =>
    prev.map(g => g.id === id ? { ...g, status } : g)
  )
}

console.log("categorias: ",categories)

useEffect(() => {
  setLocalCategories(categories!)
}, [categories])

  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Nome da categoria</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localCategories?.map((category) => (
          <TableRow key={category.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">
              <div>
                <p className="font-semibold">{category.name}</p>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  onClick={() => {setSelectedCategory(category)}}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
        <EditCategoryDialog 
          isOpen={!!selectedCategory}
          setOpen={(value) => {if (!value) setSelectedCategory(null)}}
          category={selectedCategory}
        />
    </Table>
  )
}
