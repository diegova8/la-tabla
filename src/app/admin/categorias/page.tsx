export const dynamic = "force-dynamic";

import { db } from "@/db";
import { categories, ingredients } from "@/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import { CategoriasClient } from "./categorias-client";

export default async function AdminCategoriasPage() {
  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      displayOrder: categories.displayOrder,
      ingredientCount: sql<number>`(SELECT COUNT(*) FROM ingredients WHERE ingredients.category_id = ${categories.id})`.as("ingredient_count"),
    })
    .from(categories)
    .orderBy(asc(categories.displayOrder));

  return <CategoriasClient categories={allCategories} />;
}
