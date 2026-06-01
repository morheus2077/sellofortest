'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth"
import { revalidatePath } from "next/cache";

export async function CreateCategoryAction(__prevState: any, formData: FormData){
    
    const session = await auth()
    const groceryId = session?.user.groceryId;

    const name = formData.get('name') as string;

    try {
        const category = await prisma.category.create({
            data: {
                name: name,
                grocery_id: groceryId
            }
        })

        revalidatePath("/staff/categories")
        revalidatePath("/owner/categories")
        
        return {
            success: true,
            message: "Categoria criada com sucesso!"
        }
    } catch (error) {
        console.log(error)
    }

}