'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/types/types"
import { BellRing, Edit, ListX } from "lucide-react"
import { useState } from "react"

interface ProductsTableProps {
  products: Product[]
}

export function StockAlertTable({ products }:ProductsTableProps ){
    
    const [localProducts, setLocalProducts] = useState(products || []);

    const lowStockProducts = localProducts.filter((p => p.inStock < p.minimumStock))

    return(
      <>
    {lowStockProducts.length === 0 ?(
      <h1 className="md:text-5xl pt-10 flex items-center mt-10 justify-center flex-col text-muted-foreground">
        <i><BellRing size={50}/></i> 
        Sem alertas de estoque
        </h1> 
    ) : (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Nome do produto</TableHead>
          <TableHead className="w-[20%]">Disponível em estoque</TableHead>
          <TableHead className="w-[20%]">Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lowStockProducts.map((product) => (
          <TableRow key={product.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">
              <div>
                <p className="font-semibold">{product.name}</p>
              </div>
            </TableCell>
            <TableCell>
              {product.inStock} 
            </TableCell>
            <TableCell>
              <Badge
              className="bg-red-50 text-red-700 border-red-200"
              >
              {product.inStock > 0 ? "Estoque baixo" : "Sem estoque"}
              </Badge>     
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table> 
    )}   
    </>   
  )
  
}