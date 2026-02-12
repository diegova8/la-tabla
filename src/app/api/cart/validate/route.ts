import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items?.length) {
      return NextResponse.json({ error: "No items to validate" }, { status: 400 });
    }

    const errors: string[] = [];
    const validatedItems = [];

    for (const item of items) {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId));

      if (!product) {
        errors.push(`Product ${item.productId} not found`);
        continue;
      }

      if (!product.isActive) {
        errors.push(`${product.name} is no longer available`);
        continue;
      }

      const currentPrice = parseFloat(product.price);
      const itemPrice = parseFloat(item.unitPrice);

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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
