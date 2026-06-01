'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "../../../../auth";

const CreateProductSchema = z.object({
  name: z.string({ message: "O nome é obrigatório" }).min(3, "O nome precisa conter no mínimo 3 caracteres").max(50, "O nome pode conter no máximo 50 caracteres"),
  price: z.number({ message: "o preço é obrigatório" }),
  minimumStock: z.number({ message: "O estoque mínimo é obrigatório"}),
  inStock: z.number({ message: "O disponível em estoque é obrigatório"}),
  categoryId: z.string({ message: "Categoria obrigatoria" })
});


type CreateProductSchema = z.infer<typeof CreateProductSchema>

export async function CreateProductAction(_prevState: any, formData: FormData) {

    const session = await auth();

    const groceryId = session?.user.groceryId as string;

    const priceInput = Number(formData.get('price'))
    const minimumStockInput = Number(formData.get('minimumStock'))
    const inStock = Number(formData.get("inStock"))

    const data = {
        name: formData.get('name') as string,
        price: priceInput ,
        minimumStock: minimumStockInput,
        inStock: inStock,
        categoryId: formData.get('categoryId') as string
    }

    const parsed = CreateProductSchema.safeParse(data)
    
    if (!parsed.success) {
      return {
        message: parsed.error.issues.map((err) => err.message).join(", "),
        success: false
      }
    }

    const existingProduct = await prisma.product.findFirst({
        where: {
            name: parsed.data.name,
            groceryId: session?.user.groceryId
        }
    })

    if(existingProduct){
      return {
        message: "Já existe  um produto com este nome!",
        success: false
      }
    }

    console.log(groceryId)
    
    if (!data.name || !data.price || !data.minimumStock) {
    throw new Error('Name, price and minimumStock are required')
    }
  
  try {

  const product = await prisma.product.create({
      data: {
      name: parsed.data.name,
      price: parsed.data.price,
      inStock: parsed.data.inStock,
      minimumStock: parsed.data.minimumStock,

      category: {
        connect: { id: parsed.data.categoryId }
      },

      grocery: {
        connect: { id: groceryId }
      }
    }
  })

  revalidatePath('/staff/products');

  return {
    message: "Produto criado com sucesso!",
    success: true,
    product
  }
    
  } catch (error) {
    console.log(error);
      return {
      message: "Erro ao criar produto, tente novamente mais tarde",
      success: false
    }
  }
}