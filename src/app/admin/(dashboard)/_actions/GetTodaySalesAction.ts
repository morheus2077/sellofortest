'use server'

import { prisma } from "@/lib/prisma"

export async function GetTodaySales() {
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

const sales = await prisma.sales.findMany({
    where: {
      createdAt: {
        gte: startOfDayUTC,
        lte: endOfDayUTC,
      },
    },
    include: {
      grocery: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return sales;
}