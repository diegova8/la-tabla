import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [product] = await db.select().from(products).where(eq(products.id, parseInt(id)));
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // TODO: Add auth check (admin only)
  try {
    const { id } = await params;
    const body = await request.json();
    const [product] = await db
      .update(products)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    revalidatePath("/admin/productos");
    revalidatePath("/tablas");
    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // TODO: Add auth check (admin only)
  try {
    const { id } = await params;
    const [product] = await db
      .update(products)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(products.id, parseInt(id)))
      .returning();

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    revalidatePath("/admin/productos");
    revalidatePath("/tablas");
    return NextResponse.json({ message: "Product deactivated", product });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
