import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ingredients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [ingredient] = await db.select().from(ingredients).where(eq(ingredients.id, parseInt(id)));
    if (!ingredient) return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    return NextResponse.json(ingredient);
  } catch (error) {
    console.error("GET /api/ingredients/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

    const { id } = await params;
    const body = await request.json();
    const allowed = ["name", "categoryId", "description", "imageUrl", "cost", "costUnit", "available"] as const;
    const updates: Record<string, any> = { updatedAt: new Date() };
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }
    const [ingredient] = await db
      .update(ingredients)
      .set(updates)
      .where(eq(ingredients.id, parseInt(id)))
      .returning();

    if (!ingredient) return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    return NextResponse.json(ingredient);
  } catch (error) {
    console.error("PUT /api/ingredients/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

    const { id } = await params;
    const [ingredient] = await db
      .update(ingredients)
      .set({ available: false, updatedAt: new Date() })
      .where(eq(ingredients.id, parseInt(id)))
      .returning();

    if (!ingredient) return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    return NextResponse.json({ message: "Ingredient deactivated", ingredient });
  } catch (error) {
    console.error("DELETE /api/ingredients/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
