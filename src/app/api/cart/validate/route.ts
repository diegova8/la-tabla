import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { z } from "zod";

const cartValidationSchema = z.object({
  items: z.array(z.object({
    productId: z.number().int().positive(),
    unitPrice: z.coerce.number().positive(),
    quantity: z.number().int().positive().optional().default(1),
  })).min(1).max(50),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = cartValidationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos", valid: false }, { status: 400 });
    }

    const { items } = parsed.data;
    const productIds = [...new Set(items.map(i => i.productId))];

    // Single query for all products (no N+1)
    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    const productMap = new Map(dbProducts.map(p => [p.id, p]));

    const errors: string[] = [];
    const validatedItems = [];

    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        errors.push(`Producto ${item.productId} no encontrado`);
        continue;
      }

      if (!product.isActive) {
        errors.push(`${product.name} ya no está disponible`);
        continue;
      }

      const currentPrice = parseFloat(product.price);
      const itemPrice = item.unitPrice;

      validatedItems.push({
        ...item,
        currentPrice: product.price,
        priceChanged: Math.abs(currentPrice - itemPrice) > 0.01,
        productName: product.name,
      });
    }

    return NextResponse.json({
      valid: errors.length === 0 && validatedItems.every((i) => !i.priceChanged),
      errors,
      items: validatedItems,
    });
  } catch (error) {
    console.error("POST /api/cart/validate error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
