import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth"

export async function GetGroceryMostSoldProducts() {
  const session = await auth()
  const groceryId = session?.user.groceryId

  if (!groceryId) return []

  //retorna apenas o id e a soma da quantidade dos 5 produtos mais vendidos
  const groupedProducts = await prisma.salesItem.groupBy({
    by: ["productId"], //junta todos os items de venda do mesmo produto
    where: {
      sale: {
        groceryId: groceryId
      }
    },
    _sum: {
      quantity: true,
      subtotal: true
    },
    orderBy: {
      _sum: {
        quantity: "desc"
      }
    },
    take: 5
  })

  //pega os ids dos produtos retornados
  const productIds = groupedProducts.map(item => item.productId)

  //busca os produtos cujo id esta na lista dos 5 mais vendidos pega o id e o nome 
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds
      }
    },
    select: {
      id: true,
      name: true
    }
  })

  //mapeia a lista dos 5 mais vendidos e retorna o id, nome, e quantidade vendida dos produtos
  return groupedProducts.map(item => {
    const product = products.find(product => product.id === item.productId)

    return {
      productId: item.productId,
      name: product?.name ?? "Produto desconhecido",
      quantity: item._sum.quantity ?? 0,
      total_revenue: item._sum.subtotal ?? 0
    }
  })
}