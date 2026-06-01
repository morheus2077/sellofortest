'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function AddStockAction(_prevState: any, formData: FormData){

    const quantity = Number(formData.get('quantity'))
    const productId = formData.get('productId') as string

    try{
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                inStock: {
                    increment: quantity
                }
            }  
        })
    
    revalidatePath("/staff/products")

    return {
      message: "Estoque atualizado com sucesso",
      success: true
    }
    
    } catch (error) {
        console.log(error)
    }
}