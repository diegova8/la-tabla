import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blockedDates } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const [deleted] = await db.delete(blockedDates).where(eq(blockedDates.id, parseInt(id))).returning();
    if (!deleted) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/blocked-dates error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
