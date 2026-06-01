'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth"

export async function GetGroceryTotalRevenues(){

    const session = await auth();
    const groceryId = session?.user.groceryId;

    try {
        const totalRevenues = await prisma.sales.aggregate({
            where: {
                groceryId: groceryId
            },

            _sum: {
                total: true
            }
        });
        
        return totalRevenues._sum.total ?? 0;
    } catch (error) {
        console.log(error)
    }
}