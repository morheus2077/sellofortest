'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth"

export async function GetLast30DaysData(){

    const session = await auth();

    
const dailyStats = await prisma.$queryRaw<{ date: string; totalRevenue: number; salesCount: number }[]>`
  SELECT
    TO_CHAR("createdAt"::date, 'YYYY-MM-DD') AS date,
    SUM("total")::float AS "totalRevenue",
    COUNT(*)::int AS "salesCount"
  FROM "Sales"
  WHERE "createdAt" >= NOW() - INTERVAL '30 days'
  GROUP BY "createdAt"::date
  ORDER BY "createdAt"::date ASC
`;

  return dailyStats;
}