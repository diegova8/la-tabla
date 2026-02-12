import { NextResponse } from "next/server";
import { db } from "@/db";
import { deliverySlots } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const slots = await db
      .select()
      .from(deliverySlots)
      .where(eq(deliverySlots.isActive, true))
      .orderBy(asc(deliverySlots.startTime));

    return NextResponse.json(slots);
  } catch (error) {
    console.error("GET /api/delivery-slots error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
