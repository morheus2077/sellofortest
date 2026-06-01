import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";

export async function GetGroceryLast7DaysRevenues() {

  const session = await auth();
  const groceryId = session?.user.groceryId;

  return await prisma.$queryRaw<{ date: string; total: number }[]>`
  SELECT 
    TO_CHAR("createdAt"::date, 'YYYY-MM-DD') AS date,
    SUM("total") AS total
  FROM "Sales"
  WHERE "createdAt" >= NOW() - INTERVAL '7 days'
  AND "groceryId" = ${groceryId}
  GROUP BY "createdAt"::date
  ORDER BY "createdAt"::date ASC
`;
}