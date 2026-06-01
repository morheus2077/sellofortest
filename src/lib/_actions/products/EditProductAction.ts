'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "../../../../auth";

const EditProductSchema = z.object({
  name: z.string({ message: "O nome é obrigatório" }).min(3, "O nome precisa conter no mínimo 3 caracteres").max(50, "O nome pode conter no máximo 50 caracteres"),
  price: z.number({ message: "o preço é obrigatório" }),
  minimumStock: z.number({ message: "O estoque mínimo é obrigatório"}),
  categoryId: z.string({ message: "Categoria obrigatoria" }),
});


type EditProductSchema = z.infer<typeof EditProductSchema>

export async function EditProductAction(_prevState: any, formData: FormData) {

    const priceInput = Number(formData.get('price'));
    const minimumStockInput = Number(formData.get('minimumStock'));

    const productId = formData.get('productId') as string;
    const categoryId = formData.get('categoryId') as string;

    const data = {
      name: formData.get('name') as string,
      price: priceInput ,
      minimumStock: minimumStockInput,
      categoryId: categoryId
    }

    const parsed = EditProductSchema.safeParse(data)
    
    if (!parsed.success) {
      return {
        message: parsed.error.issues.map((err) => err.message).join(", "),
        success: false
      }
    }
    
    if (!data.name || !data.price || !data.minimumStock) {
    throw new Error('Name, price and minimumStock are required')
    }
    
    try {
      
      await prisma.product.update({
        where: {
          id: productId
        },
        data: {
          name: parsed.data.name,
          price: parsed.data.price,
          minimumStock: parsed.data.minimumStock,
          categoryId: parsed.data.categoryId,  
        }
      });
      
      revalidatePath('/staff/products');
      
      return {
        message: "Produto atualizado com sucesso!",
        success: true,
      }
    
    } catch (error) {
      console.log(error);
      return {
        message: "Erro ao atualizar o produto, tente novamente mais tarde",
        success: false
      }
  }
}