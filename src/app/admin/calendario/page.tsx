export const dynamic = "force-dynamic";

import { db } from "@/db";
import { orders, blockedDates } from "@/db/schema";
import { desc, asc, gte, sql } from "drizzle-orm";
import { CalendarioClient } from "./calendario-client";

export default async function AdminCalendarioPage() {
  // Get orders grouped by delivery date (next 30 days)
  const today = new Date().toISOString().split("T")[0];

  const upcomingOrders = await db
    .select({
      deliveryDate: orders.deliveryDate,
      count: sql<number>`count(*)`.as("count"),
      total: sql<string>`sum(${orders.total}::numeric)`.as("total"),
    })
    .from(orders)
    .where(gte(orders.deliveryDate, today))
    .groupBy(orders.deliveryDate)
    .orderBy(asc(orders.deliveryDate));

  const blocked = await db
    .select()
    .from(blockedDates)
    .orderBy(asc(blockedDates.date));

  const recentOrders = await db
    .select()
    .from(orders)
    .where(gte(orders.deliveryDate, today))
    .orderBy(asc(orders.deliveryDate), desc(orders.createdAt))
    .limit(50);

  return (
    <CalendarioClient
      upcomingOrders={upcomingOrders}
      blockedDates={blocked}
      recentOrders={recentOrders}
    />
  );
}
