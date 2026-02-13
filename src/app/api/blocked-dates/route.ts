import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blockedDates } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(blockedDates).orderBy(asc(blockedDates.date));
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/blocked-dates error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

    const { date, reason } = await request.json();
    if (!date) return NextResponse.json({ error: "Fecha requerida" }, { status: 400 });

    const [blocked] = await db.insert(blockedDates).values({ date, reason: reason || null }).returning();
    return NextResponse.json(blocked, { status: 201 });
  } catch (error) {
    console.error("POST /api/blocked-dates error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
