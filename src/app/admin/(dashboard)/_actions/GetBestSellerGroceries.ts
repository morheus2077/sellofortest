'use server'

import { prisma } from "@/lib/prisma"

export async function GetBestSellerGroceries(){

    const bestSellerRevenues = await prisma.sales.groupBy({
        by: ['groceryId'],
        _sum: {
            total: true
        },
        orderBy: {
            _sum: { 
                total: "desc"
             }
        },
        take: 5
    });

    const groceriesIds: string[] = bestSellerRevenues.map((item) =>{
        return item.groceryId;
    })

    const groceries = await prisma.grocery.findMany({
        where: {
            id: {
                in: groceriesIds
            }
        },
        select: {
            id: true,
            name: true
        }
    })

    const bestSellerSales = await prisma.sales.groupBy({
        by: ['groceryId'],
        where: {
            groceryId: {
                in: groceriesIds
            }
        },
        _count: {
            id: true
        }
    })
    return groceries.map((grocery) => {

        const bestSellerRevenue = bestSellerRevenues.find(s => s.groceryId === grocery.id)

        const bestSellerSalesCount = bestSellerSales.find(s => s.groceryId === grocery.id)

        return{
            id: bestSellerRevenue?.groceryId,
            name: grocery.name,
            revenue: bestSellerRevenue?._sum.total,
            sales: bestSellerSalesCount?._count.id ?? 0
        }
    })
}