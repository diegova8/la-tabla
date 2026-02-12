export const dynamic = "force-dynamic";

import { db } from "@/db";
import { ingredients, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { IngredientsClient } from "./ingredients-client";

export default async function AdminIngredientesPage() {
  const allIngredients = await db
    .select({
      id: ingredients.id,
      name: ingredients.name,
      categoryId: ingredients.categoryId,
      cost: ingredients.cost,
      costUnit: ingredients.costUnit,
      imageUrl: ingredients.imageUrl,
      available: ingredients.available,
      categoryName: categories.name,
    })
    .from(ingredients)
    .innerJoin(categories, eq(ingredients.categoryId, categories.id))
    .orderBy(categories.displayOrder, ingredients.name);

  const allCategories = await db.select().from(categories).orderBy(categories.displayOrder);

  return (
    <div>
      <IngredientsClient
        ingredients={allIngredients}
        categories={allCategories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
