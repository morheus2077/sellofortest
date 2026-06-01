'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";

export async function GetGroceryLeastSoldProducts(){

    const session = await auth();
    const groceryId = session?.user.groceryId as string;

    const groupedProducts = await prisma.salesItem.groupBy({
        by: ['productId'],
        where: {
            sale: {
                groceryId: groceryId
            },       
        },
        _sum: {
            quantity: true
        },
        orderBy: {
            _sum: { quantity: "asc" }
        },
        take: 5
    });

    const productsIds: string[] = groupedProducts.map((product) =>{
        return product.productId;
    });

    const products = await prisma.product.findMany({
        where: {
            id:{
                in: productsIds
            }
        },
        select: {
            id: true,
            name: true
        }
    })

    return groupedProducts.map((item) => {

        const product = products.find(p => p.id === item.productId)

        return{
            id: item.productId,
            name: product?.name,
            quantity: item._sum.quantity ?? 0
        }
    })
}