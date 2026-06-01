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
import { User } from "../users/users-table"
import { DisableGroceryForm } from "./disable-grocery-form"
import { EnableGroceryForm } from "./enable-grocery-form"
import { useEffect, useState } from "react"
import { GroceryProps } from "../_actions/GetGroceriesActions"

export interface Grocery {
    id: string,
    name: string,
    contact: string,
    status: string,
    location: string,
    createdAt: Date,
    updatedAt: Date,
    users: User[],
    products: {
        id: string,
        name: string,
        price: number,
        description: string,
        minimumStock: number,
        groceryId: string,
        createdAt: Date,
        updatedAt: Date
    }[]
}

interface GroceriesTableProps {
  groceries: GroceryProps[] | undefined
}

export function GroceriesTable({ groceries }: GroceriesTableProps) {

const [localGroceries, setLocalGroceries] = useState(groceries || undefined)

function handleStatusChange(id: string, status: string) {
  setLocalGroceries(prev =>
    prev?.map(g => g.id === id ? { ...g, status } : g)
  )
}

useEffect(() => {
  setLocalGroceries(groceries)
}, [groceries])

//  const staffByGrocery = groceries.map(grocery => ({
//   groceryName: grocery.name,
//   staffNames: grocery.users
//     .filter(user => user.role?.name === "STAFF")
//     .map(user => user.name)
// }));

//  const ownerByGrocery = groceries.map(grocery => ({
//   groceryName: grocery.name,
//   ownerNames: grocery.users
//     .filter(user => user.role?.name === "OWNER")
//     .map(user => user.name)
// }));

  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Nome</TableHead>
          <TableHead className="w-[20%]">Localização</TableHead>
          <TableHead className="w-[20%]">Gerente</TableHead>
          <TableHead className="w-[20%]">Proprietário</TableHead>
          <TableHead className="w-[20%]">Produtos cadastrados</TableHead>
          <TableHead className="w-[15%]">Status</TableHead>
          <TableHead className="w-[16%] text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localGroceries?.map((grocery) => (
          <TableRow key={grocery.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">
              <div>
                <p className="font-semibold">{grocery.name}</p>
                <p className="text-sm text-muted-foreground">{grocery.contact}</p>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              {grocery.location}
            </TableCell>
            <TableCell>
              {grocery.users
              .filter(user => user.role?.name === "STAFF")
              .map(user => user.name)
              .join(", ") || "-"}
            </TableCell>
            <TableCell>
              {grocery.users
              .filter(user => user.role?.name === "OWNER")
              .map(user => user.name)
              .join(", ") || "-"}
            </TableCell>
            <TableCell>
              {grocery.products.length} 
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  grocery.status === "ACTIVE"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }
              >
                {grocery.status === "ACTIVE" ? "ATIVO" : "INATIVO"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
            <div
              >
                {grocery.status === "ACTIVE" ?  (
                  <DisableGroceryForm  onSuccess={status => handleStatusChange(grocery.id, status)} groceryId={grocery.id} />
                  ): (
                    <EnableGroceryForm  onSuccess={status => handleStatusChange(grocery.id, status)} groceryId={grocery.id}/> 
                  )}
              </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
