'use server'

import { prisma } from "@/lib/prisma"
import { Category } from "@/types/types";
import { auth } from "../../../../auth";

export async function GetCategories(){

    const session = await auth();
    const groceryId = session?.user.groceryId;

    try{
        const categories: Category[] | null = await prisma.category.findMany({
            where: {
                grocery_id: groceryId
            }
        })

        return categories ;
    } catch (error) {
        console.log(error)
    }
    
}