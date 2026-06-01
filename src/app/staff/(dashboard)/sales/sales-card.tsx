"use client"

import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useState, useEffect } from "react"
import { Items, Sale } from "@/types/types"
import { SalesItem } from "./sales-item"

interface SalesCardsProps {
  sales?: Sale[]
}

export function SalesCards({ sales }: SalesCardsProps) {
  const [localSales, setLocalSales] = useState(sales ?? [])

  useEffect(() => {
    setLocalSales(sales ?? [])
  }, [sales])

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {localSales.map((sale) => {
        // Soma a quantidade de produtos para esta venda
        const totalProducts = sale.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        )

        return (
          <div
            key={sale.id}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all duration-150"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground">Venda #{sale.id}</p>
                <p className="text-2xl font-bold text-green-700 mt-1">
                  {sale.total} MZN
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <span className="font-semibold">Pago:</span> {sale.paidValue} MZN
              </p>
              <p>
                <span className="font-semibold">Troco:</span> {sale.exchange} MZN
              </p>
              <p>
                <span className="font-semibold">Produtos vendidos:</span> {totalProducts}
              </p>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-muted" />

            {/* STATUS */}
            <div className="mt-4">
              {sale.paidValue >= sale.total ? (
                <span className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-medium">
                  ✓ Venda realizada
                </span>
              ) : (
                <span className="text-xs px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  • Pagamento Pendente
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}