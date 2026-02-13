import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ingredients, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const query = db
      .select({
        id: ingredients.id,
        name: ingredients.name,
        categoryId: ingredients.categoryId,
        cost: ingredients.cost,
        costUnit: ingredients.costUnit,
        imageUrl: ingredients.imageUrl,
        description: ingredients.description,
        available: ingredients.available,
        categoryName: categories.name,
      })
      .from(ingredients)
      .innerJoin(categories, eq(ingredients.categoryId, categories.id));

    const result = categoryId
      ? await query.where(eq(ingredients.categoryId, parseInt(categoryId)))
      : await query;

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/ingredients error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // TODO: Add auth check (admin only)
  try {
  const authResult = await requireAdmin();
  if (authResult instanceof Response) return authResult;

    const body = await request.json();
    const { name, categoryId, cost, costUnit, imageUrl, description } = body;

    if (!name || !categoryId || !cost || !costUnit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [ingredient] = await db.insert(ingredients).values({
      name,
      categoryId,
      cost,
      costUnit,
      imageUrl: imageUrl || null,
      description: description || null,
    }).returning();

    return NextResponse.json(ingredient, { status: 201 });
  } catch (error) {
    console.error("POST /api/ingredients error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
