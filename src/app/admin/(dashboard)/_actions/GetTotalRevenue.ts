'use server'

import { prisma } from "@/lib/prisma"

export async function GetTotalRevenue(){

    const totalRevenue = await prisma.sales.aggregate({
        _sum: { 
            total: true
         }
    });

    return totalRevenue._sum.total ?? 0;
}