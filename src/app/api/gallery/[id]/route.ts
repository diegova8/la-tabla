import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { productImages } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

    const [deleted] = await db.delete(productImages).where(eq(productImages.id, parseInt(id))).returning();
    if (!deleted) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
