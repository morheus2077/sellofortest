import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth";


export async function GetGroceryAllSales(){

    const session = await auth();

    const groceryId = session?.user.groceryId;

    try {
        const allSales = await prisma.sales.count({
            where: {
                groceryId: groceryId
            }
        });

        return allSales ?? 0;
    } catch (error) {
        console.log(error)
    }
}