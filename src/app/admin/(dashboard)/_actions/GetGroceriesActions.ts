import { prisma } from "@/lib/prisma"
import { User } from "../users/users-table";

export interface GroceryProps {
    id: string,
    name: string,
    contact: string,
    location: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    users: User[],
    products: {
        id: string,
        name: string,
        price: number,
        inStock: number,
        minimumStock: number,
        groceryId: string,
        createdAt: Date,
        updatedAt: Date
    }[]
}

export async function getGroceries() {
  try {
    const groceries: GroceryProps[] = await prisma.grocery.findMany({
        include: {
            products: true,
            sales: true,
            users: {
                include: {
                    role: true,
                    grocery: true
                }
            }
        }
    });
    console.log(groceries)
    return groceries 
  } catch (error) {
    // throw new Error('Failed to fetch groceries')
    console.debug(error)
  }
}