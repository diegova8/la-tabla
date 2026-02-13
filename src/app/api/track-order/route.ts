import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products, deliverySlots } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const orderNumber = request.nextUrl.searchParams.get("n");

  if (!orderNumber) {
    return NextResponse.json({ error: "Número de pedido requerido" }, { status: 400 });
  }

  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    if (!order) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    const items = await db
      .select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
        totalPrice: orderItems.totalPrice,
        notes: orderItems.notes,
        productName: products.name,
        productImage: products.imageUrl,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id));

    let slotLabel = null;
    if (order.deliverySlotId) {
      const [slot] = await db
        .select({ label: deliverySlots.label })
        .from(deliverySlots)
        .where(eq(deliverySlots.id, order.deliverySlotId))
        .limit(1);
      slotLabel = slot?.label || null;
    }

    // Only expose non-sensitive data to public tracking
    const firstName = order.guestName?.split(" ")[0] || "";
    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
      guestName: firstName,
      deliveryMethod: order.deliveryMethod,
      deliveryDate: order.deliveryDate,
      deliverySlot: slotLabel,
      subtotal: order.subtotal,
      deliveryCost: order.deliveryCost,
      total: order.total,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      items,
    });
  } catch (error) {
    console.error("GET /api/track-order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
