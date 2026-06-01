'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "../../../../auth"
import { revalidatePath } from "next/cache";

export async function CreateSaleAction(_prevState: any, formData: FormData){

    const exchange = Number(formData.get('exchange'));
    const paidValue = Number(formData.get('paidValue'));
    const total = Number(formData.get('total'));

    const itemsRaw = formData.get('items') as string;
    const items = JSON.parse(itemsRaw)

    const session = await auth();

    const groceryId = session?.user.groceryId as string;
    const userId = session?.user.id as string;

    if(!items || !paidValue || !total || !groceryId || !userId){
      return {
        sucess: false,
        message: "Preencha todos os campos necessários"
      }
    }

 try{
    await prisma.$transaction(async (tx) => {

    const sale = await tx.sales.create({
        data: {
            paidValue: paidValue,
            exchange: exchange,
            total: total,
            groceryId: groceryId,
            userId: userId
        }
    })

    const saleItem = await tx.salesItem.createMany({
        data: items.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
          subtotal: item.quantity * item.product.price,
          saleId: sale.id,      
        }))
    })

      for (const item of items) {

        await tx.product.update({
          where: { id: item.product.id },
          data: {
            inStock: {
              decrement: item.quantity,
            },
          },
        })
      }

    },
    {
        maxWait: 8000,
        timeout: 5000
    }
    )

    revalidatePath('/staff/sales');

    return {
      success: true,
      message: "Venda realizada com sucesso!",
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Erro ao criar venda",
    }
  }

}