'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function EditCategoryAction(__prevState: any, formData: FormData){
    const categoryId = formData.get('categoryId') as string
    const newName = formData.get('name') as string

    try{
        await prisma.category.update({
            where:{
                id: categoryId
            },
            data: {
                name: newName
            }
        })
        
        revalidatePath("/staff/categories")
        revalidatePath("/owner/categories")

        return{
            success: true,
            messsage: "Categoria atualizada com sucesso!"
        }
    } catch(error) {
        console.log(error)
    }

}