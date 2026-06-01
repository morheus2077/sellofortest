'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth";
import { Sale } from "@/types/types";

export async function GetTodayStaffSalesAction() {
  const now = new Date()
  const session = await auth();

  const groceryId = session?.user.groceryId;

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

  try{

  const todayStaffSales = await prisma.sales.findMany({
    where: {
      groceryId: groceryId,
      createdAt: {
        gte: startOfDayUTC,
        lte: endOfDayUTC,
      },
    },
    select: {
        id: true,
        paidValue: true,
        exchange: true,
        total: true,
        userId: true,
        groceryId: true,
        items: {
            select: {
                id: true,
                unitPrice: true,
                subtotal: true,
                quantity: true,
                saleId: true      
            }
        },
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  console.log(todayStaffSales)

  return todayStaffSales;

  } catch (error) {
    console.log(error)
    return;
  }

}