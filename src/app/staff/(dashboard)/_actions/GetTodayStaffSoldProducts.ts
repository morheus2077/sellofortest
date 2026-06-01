'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth"

export async function GetTodayStaffSoldProductsCount() {
  const now = new Date()
  const session = await auth()

  const groceryId = session?.user.groceryId;
  const userId = session?.user.id;

  const startOfDayUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0
  ))

  const endOfDayUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23, 59, 59, 999
  ))

  const todayStaffSoldProducts =  await prisma.salesItem.aggregate({
    where: {
    sale: {
        groceryId: groceryId,
        userId: userId
    },
      createdAt: {
        gte: startOfDayUTC,
        lte: endOfDayUTC,
      },  
    },
    _sum: {
      quantity: true
    }
  })

  return todayStaffSoldProducts._sum.quantity ?? 0;
}