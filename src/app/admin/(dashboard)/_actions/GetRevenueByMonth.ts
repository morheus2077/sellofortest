'use server'
import { prisma } from "@/lib/prisma";

export async function GetRevenueByMonth() {
  const sales = await prisma.$queryRaw<
  {
    month: number; 
    total: number 
  }[]
  >`
    SELECT 
      EXTRACT(MONTH FROM "createdAt") as month,
      SUM(total) as total
    FROM "Sales"
    GROUP BY month
    ORDER BY month
  `
  return sales
}