'use server'

import { prisma } from "@/lib/prisma"

export async function GetTodaySalesCount() {
  const now = new Date()

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

  return await prisma.sales.count({
    where: {
      createdAt: {
        gte: startOfDayUTC,
        lte: endOfDayUTC,
      },
    },
  })
}