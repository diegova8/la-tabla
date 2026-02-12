import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, orderItemIngredients, products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { sendOrderEmails } from "@/lib/emails/send-order-emails";

function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LT-${date}-${rand}`;
}

export async function GET() {
  // TODO: Add auth check (admin only)
  try {
    const result = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(100);

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, email, phone,
      deliveryMethod, deliveryDate, deliverySlot,
      address, paymentMethod, notes, items,
    } = body;

    if (!name || !email || !phone || !deliveryMethod || !deliveryDate || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += parseFloat(item.unitPrice) * (item.quantity || 1);
    }

    const deliveryCost = deliveryMethod === "delivery" ? 0 : 0; // TODO: calculate delivery cost by zone
    const total = subtotal + deliveryCost;
    const orderNumber = generateOrderNumber();

    // Create order
    const [order] = await db.insert(orders).values({
      orderNumber,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      status: "pending",
      deliveryMethod,
      deliveryDate,
      deliverySlotId: deliverySlot ? parseInt(deliverySlot) : null,
      deliveryAddress: address || null,
      deliveryCost: deliveryCost.toFixed(2),
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      paymentMethod: paymentMethod || null,
      notes: notes || null,
    }).returning();

    // Create order items
    for (const item of items) {
      const unitPrice = parseFloat(item.unitPrice);
      const quantity = item.quantity || 1;

      const [orderItem] = await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        variantId: item.variantId || null,
        quantity,
        unitPrice: unitPrice.toFixed(2),
        totalPrice: (unitPrice * quantity).toFixed(2),
        notes: item.notes || null,
      }).returning();

      // Create selected ingredients if any
      if (item.selectedIngredients?.length) {
        for (const ing of item.selectedIngredients) {
          await db.insert(orderItemIngredients).values({
            orderItemId: orderItem.id,
            ingredientId: ing.ingredientId,
            categoryId: ing.categoryId,
          });
        }
      }
    }

    // Send confirmation emails (non-blocking)
    const emailItems = await Promise.all(
      items.map(async (item: any) => {
        let productName = item.name || "Producto";
        if (item.productId) {
          const [prod] = await db.select({ name: products.name }).from(products).where(eq(products.id, item.productId)).limit(1);
          if (prod) productName = prod.name;
        }
        return {
          name: productName,
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice,
          totalPrice: (parseFloat(item.unitPrice) * (item.quantity || 1)).toFixed(2),
          notes: item.notes,
        };
      })
    );

    console.log("📧 Sending order emails to:", email);
    sendOrderEmails({
      orderNumber,
      customerName: name,
      customerEmail: email,
      items: emailItems,
      subtotal: subtotal.toFixed(2),
      deliveryCost: deliveryCost.toFixed(2),
      total: total.toFixed(2),
      deliveryMethod,
      deliveryDate,
      deliveryAddress: address,
      paymentMethod,
      notes,
    }).catch((err) => console.error("Email send error:", err));

    return NextResponse.json({ orderNumber, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
