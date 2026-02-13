import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, orderItemIngredients, products } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
// Dynamic import to prevent build failures


function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const rand = Array.from(bytes).map(b => b.toString(36)).join("").substring(0, 8).toUpperCase();
  return `LT-${date}-${rand}`;
}

export async function GET() {
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

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

    // Create order items (batch)
    const orderItemValues = items.map((item: any) => ({
      orderId: order.id,
      productId: item.productId,
      variantId: item.variantId || null,
      quantity: item.quantity || 1,
      unitPrice: parseFloat(item.unitPrice).toFixed(2),
      totalPrice: (parseFloat(item.unitPrice) * (item.quantity || 1)).toFixed(2),
      notes: item.notes || null,
    }));

    const createdItems = await db.insert(orderItems).values(orderItemValues).returning();

    // Batch insert ingredients
    const allIngredients: { orderItemId: number; ingredientId: number; categoryId: number }[] = [];
    items.forEach((item: any, idx: number) => {
      if (item.selectedIngredients?.length) {
        for (const ing of item.selectedIngredients) {
          allIngredients.push({
            orderItemId: createdItems[idx].id,
            ingredientId: ing.ingredientId,
            categoryId: ing.categoryId,
          });
        }
      }
    });

    if (allIngredients.length > 0) {
      await db.insert(orderItemIngredients).values(allIngredients);
    }

    // Send confirmation emails (non-blocking)
    const productIds = items.map((i: any) => i.productId).filter(Boolean);
    const productNames = productIds.length > 0
      ? await db.select({ id: products.id, name: products.name }).from(products).where(inArray(products.id, productIds))
      : [];
    const nameMap = new Map(productNames.map((p) => [p.id, p.name]));

    const emailItems = items.map((item: any) => ({
      name: nameMap.get(item.productId) || item.name || "Producto",
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice,
      totalPrice: (parseFloat(item.unitPrice) * (item.quantity || 1)).toFixed(2),
      notes: item.notes,
    }));

    import("@/lib/emails/send-order-emails").then(({ sendOrderEmails }) => sendOrderEmails({
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
    })).catch((err) => console.error("Email send error:", err));

    return NextResponse.json({ orderNumber, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
