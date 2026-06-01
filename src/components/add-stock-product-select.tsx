"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"

export interface Product {
  id: string
  name: string
  price: number
  category: {
    id: string
    name: string
  }
  minimumStock: number
  groceryId: string
  inStock: number
  createdAt: Date
  updatedAt: Date
}

type ProductSelectProps = {
  products: Product[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

function AddStockProductSelect({
  products,
  value,
  onValueChange,
  placeholder = "Selecionar produto",
  className,
}: ProductSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selected = products.find((p) => p.id === value)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between h-12 sm:h-11 text-base",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {selected ? selected.name : placeholder}
          </span>

          <ChevronsUpDown className="ml-2 size-5 opacity-60 shrink-0" />
        </Button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="p-0 w-[95%] sm:max-w-lg rounded-2xl overflow-hidden">
        <DialogTitle className="px-4 py-4 border-b text-base sm:text-lg font-semibold">
          Selecionar produto
        </DialogTitle>

        <div className="px-3 py-3">
          <Command className="w-full [&_[cmdk-group]]:p-0">
            
            {/* SEARCH */}
            <CommandInput
              placeholder="Pesquisar produto..."
              className="h-12 sm:h-11 text-base px-3"
            />

            <CommandEmpty className="py-6 text-center text-sm">
              Nenhum produto encontrado.
            </CommandEmpty>

            {/* LIST */}
            <CommandGroup className="mt-3 max-h-[60vh] overflow-y-auto flex flex-col gap-3 pb-2">
              {products.map((product) => {
                const isSelected = value === product.id
                const isOut = product.inStock === 0
                const isLow = product.inStock <= product.minimumStock

                return (
                  <CommandItem
                    key={product.id}
                    value={product.id}
                    keywords={[product.name, product.category.name]}
                    onSelect={() => {
                      onValueChange?.(product.id)
                      setOpen(false)
                    }}
                    className={cn(
                      "w-full rounded-xl border px-3 py-3.5 flex items-center justify-between gap-3 transition-all",
                      "active:scale-[0.98] sm:hover:shadow-md sm:hover:scale-[1.01]",
                      "cursor-pointer bg-background",
                      isSelected && "border-primary bg-primary/5",
                      isOut && "border-red-300 bg-red-50/40",
                      !isOut && isLow && "border-yellow-300 bg-yellow-50/40"
                    )}
                  >
                    {/* LEFT */}
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="text-[15px] sm:text-base font-medium truncate">
                        {product.name}
                      </span>

                      <span className="text-xs text-muted-foreground truncate">
                        {product.category.name}
                      </span>

                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap font-medium",
                            isOut
                              ? "bg-red-100 text-red-700"
                              : isLow
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          )}
                        >
                          {isOut
                            ? "Sem stock"
                            : isLow
                            ? `Baixo (${product.inStock})`
                            : `${product.inStock} em stock`}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
                        {product.price.toLocaleString()} MT
                      </span>

                      <CheckIcon
                        className={cn(
                          "size-5 transition-opacity",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { AddStockProductSelect }