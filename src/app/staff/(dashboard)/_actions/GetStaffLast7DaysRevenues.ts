import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";

export async function GetStaff7LastDaysRevenues() {

  const session = await auth();
  const userId = session?.user.id;

return await prisma.$queryRaw<{ date: string; total: number }[]>`
  SELECT 
    TO_CHAR("createdAt"::date, 'YYYY-MM-DD') AS date,
    SUM("total") AS total
  FROM "Sales"
  WHERE "createdAt" >= NOW() - INTERVAL '7 days'
  AND "userId" = ${userId}
  GROUP BY "createdAt"::date
  ORDER BY "createdAt"::date ASC
`;
}