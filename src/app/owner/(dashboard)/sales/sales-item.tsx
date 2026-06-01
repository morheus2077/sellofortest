"use client"

import { Items } from "@/types/types"
import { useState, useEffect } from "react"

interface Props {
  items?: Items[]
}

export function SalesItem({ items }: Props) {
  const [saleItems, setSaleItems] = useState<Items[]>(items ?? [])

  useEffect(() => {
    setSaleItems(items ?? [])
  }, [items])

  return (
    <div className="text-sm space-y-4">
      {saleItems.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border bg-muted/30 p-3 shadow-sm hover:bg-muted/50 transition"
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">
              Produto #{item.id.slice(0, 6)}...
            </p>

            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              {item.quantity} uni.
            </span>
          </div>

          <div className="mt-2 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Preço unitário:</span>{" "}
              {item.unitPrice} MZN
            </p>

            <p className="font-semibold text-green-700">
              Subtotal: {item.subtotal} MZN
            </p>
          </div>
        </div>
      ))}

      {saleItems.length === 0 && (
        <p className="text-xs text-muted-foreground italic">
          Nenhum item nesta venda.
        </p>
      )}
    </div>
  )
}