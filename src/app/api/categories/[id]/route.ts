import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: Promise<{ id: string }>;
}

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { name, displayOrder } = body;

    const updates: Record<string, any> = {};
    if (name !== undefined) {
      updates.name = name.trim();
      updates.slug = slugify(name);
    }
    if (displayOrder !== undefined) updates.displayOrder = displayOrder;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No hay cambios" }, { status: 400 });
    }

    const [updated] = await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.message?.includes("unique")) {
      return NextResponse.json({ error: "Ya existe una categoría con ese nombre" }, { status: 409 });
    }
    console.error("PUT /api/categories error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const [deleted] = await db
      .delete(categories)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.message?.includes("foreign key") || error?.message?.includes("violates")) {
      return NextResponse.json({ error: "No se puede eliminar: hay ingredientes o reglas usando esta categoría" }, { status: 409 });
    }
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
