import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { createProductSchema } from "@/lib/validations";

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
  try {
    const authResult = await requireAdmin();
    if (authResult instanceof Response) return authResult;

    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = parsed.data;
    const [product] = await db.insert(products).values({
      name: data.name,
      slug: data.slug,
      type: data.type,
      description: data.description || null,
      shortDesc: data.shortDesc || null,
      price: data.price,
      imageUrl: data.imageUrl || null,
      personsMin: data.personsMin ?? null,
      personsMax: data.personsMax ?? null,
      isConfigurable: data.isConfigurable,
      isFixed: data.isFixed,
      displayOrder: data.displayOrder,
    }).returning();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    const msg = error?.message || "";
    if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
      return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
    }
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
