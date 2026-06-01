import { prisma } from "@/lib/prisma"
import { User } from "../users/users-table";

export interface SaleProps {
  id: string
  total: number
  createdAt: Date

  grocery: {
    id: string
    name: string
  }

  user: {
    id: string
    name: string
  }

  items: {
    id: string
    quantity: number
    unitPrice: number
    subtotal: number
    product: {
      id: string
      name: string
    }
  }[]
}

export async function getSales(): Promise<SaleProps[]> {
  try {
    const sales: SaleProps[] = await prisma.sales.findMany({
      select: {
        id: true,
        total: true,
        createdAt: true,

        grocery: {
          select: {
            id: true,
            name: true,
          },
        },

        user: {
          select: {
            id: true,
            name: true,
          },
        },

        items: {
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            subtotal: true,

            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return sales
  } catch (error) {
    throw new Error("Failed to fetch sales")
  }
}