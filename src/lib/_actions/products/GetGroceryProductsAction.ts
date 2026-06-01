'use server'

import { prisma } from "@/lib/prisma"
import { Product } from "@/types/types";
import { auth } from "../../../../auth";

export async function GetGroceryProducts(){
    
    const session = await auth();
    const userGroceryId = session?.user.groceryId;

    const products: Product[] = await prisma.product.findMany({
        where: {
            groceryId: userGroceryId
        },
        select: {
            id: true,
            name: true,
            price: true,
            minimumStock: true,
            groceryId: true,
            inStock: true,
            createdAt: true,
            updatedAt: true,
            
            category: {
                select: {
                    id: true,
                    name: true
                }
            },
            grocery: {
                select: {
                    id: true,
                    name: true
                }
            } 
        }
    });

    return products;
}

