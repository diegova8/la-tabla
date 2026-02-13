import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, ilike, or, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const pattern = `%${q}%`;
    const results = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.isActive, true),
          or(
            ilike(products.name, pattern),
            ilike(products.shortDesc, pattern),
            ilike(products.description, pattern)
          )
        )
      )
      .limit(10);

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
