"use client"
import { Search, File, ArrowBigUp, ListX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Items, Product, Sale } from "@/types/types"
import { SalesCards} from "./sales-card"

interface Props {
  sales?: Sale[],
}

export function SalesClient({ sales }: Props) {
  console.log(sales)

  return (
    <>
    <div className="flex  sm:flex-row sm:items-center justify-center gap-4 mx-5 ">
      {sales?.length === 0 ? (
      <h1 className="text-5xl pt-10 flex items-center mt-28 justify-center flex-col text-muted-foreground">
        <i><ListX size={50}/></i> 
        sem vendas
        </h1> 
      ):(
        <>
      <SalesCards
      sales={sales}
      />
      </>
      )}
    </div>
    </>
  )
}