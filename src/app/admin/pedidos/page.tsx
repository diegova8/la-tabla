export const dynamic = "force-dynamic";

import { Heading } from "@/components/ui/heading";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart } from "lucide-react";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import { OrderDetail } from "@/components/admin/order-detail";

export default async function AdminPedidosPage() {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(50);

  return (
    <div>
      <Heading level={1} className="mb-8">
        Pedidos
      </Heading>

      {allOrders.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart className="h-12 w-12" />}
          title="No hay pedidos aún"
          description="Los pedidos aparecerán aquí cuando los clientes empiecen a comprar."
        />
      ) : (
        <div className="space-y-3">
          {allOrders.map((order) => (
            <OrderDetail
              key={order.id}
              order={{
                id: order.id,
                orderNumber: order.orderNumber,
                status: order.status,
                guestName: order.guestName,
                guestEmail: order.guestEmail,
                guestPhone: order.guestPhone,
                deliveryMethod: order.deliveryMethod,
                deliveryDate: order.deliveryDate,
                deliveryAddress: order.deliveryAddress,
                total: order.total,
                notes: order.notes,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
