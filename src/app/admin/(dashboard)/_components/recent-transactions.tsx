'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SaleProps } from "../_actions/GetSalesAction"
import { useState } from "react"

interface RecentSalesProps {
  recentSales: SaleProps[]
}

export function RecentTransactions({ recentSales }: RecentSalesProps ) {

  const[sales, setSales] = useState(recentSales || []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vendedor</TableHead>
          <TableHead>Loja</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Hora</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
        <TableBody>
          {sales.map((recentSales) => (
            <TableRow key={recentSales.id}>
              <TableCell className="font-medium">{recentSales.user.name}</TableCell>
              <TableCell>{recentSales.grocery.name}</TableCell>
              <TableCell>{recentSales.items[0]?.product.name}...</TableCell>
              <TableCell>
                {recentSales.createdAt.toLocaleDateString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit"
              }).slice(12, 17)}
              </TableCell>
              <TableCell className="text-green-600">
                {recentSales.total} Mzn
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}
