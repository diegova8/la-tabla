import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { StatsCard } from "@/components/admin/stats-card";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { eq, sql, and, gte } from "drizzle-orm";

export default async function AdminDashboard() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [todayOrders] = await db
    .select({
      count: sql<number>`count(*)`,
      total: sql<number>`coalesce(sum(${orders.total}::numeric), 0)`,
    })
    .from(orders)
    .where(gte(orders.createdAt, todayStart));

  const [pendingOrders] = await db
    .select({ count: sql<number>`count(*)` })
    .from(orders)
    .where(eq(orders.status, "pending"));

  const [activeProducts] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(eq(products.isActive, true));

  return (
    <div>
      <Heading level={1} className="mb-8">
        Dashboard
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Ventas de hoy"
          value={`₡${Number(todayOrders.total).toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos hoy"
          value={todayOrders.count}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Pedidos pendientes"
          value={pendingOrders.count}
          icon={TrendingUp}
          changeType={pendingOrders.count > 0 ? "negative" : "neutral"}
        />
        <StatsCard
          title="Productos activos"
          value={activeProducts.count}
          icon={Package}
        />
      </div>
    </div>
  );
}
