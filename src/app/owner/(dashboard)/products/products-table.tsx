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
import { Category, Product } from "@/types/types"
import { EditProductDialog } from "./edit-product-dialog"

interface ProductsTableProps {
  products: Product[] | undefined,
  categories: Category[] | undefined;
}

export function ProductsTable({ products, categories }: ProductsTableProps) {

const [localProducts, setLocalProducts] = useState(products || undefined)
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

function handleStatusChange(id: string, status: string) {
  setLocalProducts(prev =>
    prev?.map(g => g.id === id ? { ...g, status } : g)
  )
}

useEffect(() => {
  setLocalProducts(products)
}, [products])

  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Nome do produto</TableHead>
          <TableHead className="w-[20%]">Preço</TableHead>
          <TableHead className="w-[20%]">Categoria</TableHead>
          <TableHead className="w-[30%]">Disponível em estoque</TableHead>
          <TableHead className="w-[30%]">Estoque mínimo</TableHead>
          <TableHead className="w-[16%] text-right">Estado</TableHead>
          <TableHead className="w-[16%] text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localProducts?.map((product) => (
          <TableRow key={product.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">
              <div>
                <p className="font-semibold">{product.name}</p>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              {product.price} MZN
            </TableCell>
            <TableCell>
              {product.category.name} 
            </TableCell>
            <TableCell>
              {product.inStock} 
            </TableCell>
            <TableCell>
              {product.minimumStock} 
            </TableCell>
            <TableCell>
              {product.inStock === 0 ? (
                <Badge className=" bg-red-50 text-red-700 border-red-200">
                  <span >Sem estoque</span>
                </Badge>
              ): product.inStock > 0 && product.inStock < product.minimumStock ?(
                <Badge className=" bg-red-50 text-red-700 border-red-200">
                  <span>Estoque baixo</span>
                </Badge>
              ): (
                <Badge className=" bg-green-50 text-green-700 border-green-200">
                  <span>Disponível</span>
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  onClick={() => {setSelectedProduct(product)}}
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
        <EditProductDialog 
          isOpen={!!selectedProduct}
          setOpen={(value) => {if (!value) setSelectedProduct(null)}}
          categories={categories}
          product={selectedProduct}
        />
    </Table>
  )
}
