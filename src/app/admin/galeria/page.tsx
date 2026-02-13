export const dynamic = "force-dynamic";

import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { GaleriaClient } from "./galeria-client";

export default async function AdminGaleriaPage() {
  const images = await db
    .select({
      id: productImages.id,
      imageUrl: productImages.imageUrl,
      altText: productImages.altText,
      displayOrder: productImages.displayOrder,
      productId: productImages.productId,
      productName: products.name,
    })
    .from(productImages)
    .innerJoin(products, eq(productImages.productId, products.id))
    .orderBy(desc(productImages.id));

  const allProducts = await db
    .select({ id: products.id, name: products.name })
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(asc(products.name));

  return <GaleriaClient images={images} products={allProducts} />;
}
