import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const active = searchParams.get("active");

    const conditions = [];
    if (type) conditions.push(eq(products.type, type));
    if (active !== null && active !== undefined) {
      conditions.push(eq(products.isActive, active !== "false"));
    }

    const result = await db
      .select()
      .from(products)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(products.type, products.displayOrder);

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // TODO: Add auth check (admin only)
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

    const body = await request.json();
    const { name, slug, type, description, shortDesc, price, imageUrl, personsMin, personsMax, isConfigurable, isFixed, displayOrder } = body;

    if (!name || !slug || !type || !price) {
      return NextResponse.json({ error: "Missing required fields: name, slug, type, price" }, { status: 400 });
    }

    const [product] = await db.insert(products).values({
      name,
      slug,
      type,
      description: description || null,
      shortDesc: shortDesc || null,
      price,
      imageUrl: imageUrl || null,
      personsMin: personsMin || null,
      personsMax: personsMax || null,
      isConfigurable: isConfigurable ?? false,
      isFixed: isFixed ?? false,
      displayOrder: displayOrder ?? 0,
    }).returning();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    const msg = error?.message || error?.detail || String(error);
    if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
      return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error", detail: msg }, { status: 500 });
  }
}
