"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth"
import { revalidatePath } from "next/cache"

export async function DisableGroceryAction(_prevState: any, formData: FormData) {
  const session = await auth()

  const groceryId = formData.get("groceryId") as string

  // if (!session || session.user.role.name !== "ADMIN") {
  //   throw new Error("Sem permissão")
  // }

  await prisma.grocery.update({ 
    where: {
       id: groceryId 
    }, 
    data: {
      status: "INACTIVE" 
    } 
  });

  await prisma.users.updateMany({
    where: {
      groceryId 
    }, 
    data: {
      status: "INACTIVE" 
    } 
  });

  revalidatePath("/admin/groceries")
      return {
      success: true,
      status: "INACTIVE",
    }
}