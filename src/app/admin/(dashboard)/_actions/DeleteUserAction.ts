'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function DeleteUserAction(_prevState: any, formData: FormData){

    const userId = formData.get("userId") as string;

    console.log(userId)

    try {
        await prisma.users.delete({
            where: {
                id: userId
            }
        }) 

        revalidatePath("/admin/users");

        return{
            success: true,
            message: "User deletado com sucesso"
        }
    } catch (error) {
        console.log(error)

        return{
            success: false,
            message: "Erro ao deletar usuario"
        }
    }
}