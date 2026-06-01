'use server'

import { prisma } from "@/lib/prisma"

export async function GetAllProductsCount(){
    
    const products =  await prisma.product.count();

    return products ?? 0;
}