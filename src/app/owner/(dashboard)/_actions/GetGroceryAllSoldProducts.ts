'use server'

import { prisma } from "@/lib/prisma"

export async function GetGroceryAllSoldProducts(){

    try { 
        
    const allSoldProducts = await prisma.salesItem.aggregate({
        _sum: {
            quantity: true
        }
    })

    return allSoldProducts._sum.quantity ?? 0;
    } catch (error) {
        console.log(error)
    }
}