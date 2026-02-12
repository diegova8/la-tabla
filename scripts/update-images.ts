import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";

async function updateImages() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const imageMap: Record<string, string> = {
    // Tablas
    "salamanca": "/images/detail/jamon-queso-closeup.jpg",
    "malasana": "/images/tablas/tabla-grande-exterior.jpg",
    "andalucia": "/images/tablas/tres-tablas-cocina.jpg",
    "marbella": "/images/tablas/tres-tablas-cocina.jpg",
    "serrano": "/images/servicios/mesa-evento-completa.jpg",
    "marie-antoinette": "/images/detail/jamon-queso-closeup.jpg",
    // Servicios
    "mesa-regular": "/images/brand/carrito-la-tabla-evento.jpg",
    "mesa-premium": "/images/mesa/mesa-buffet-ingredientes.jpg",
    "private-chef": "/images/brand/carrito-la-tabla-evento.jpg",
    // Talleres
    "clase-montaje-tablas": "/images/talleres/taller-grupo.jpg",
    "taller-virtual": "/images/talleres/taller-grupo.jpg",
  };

  console.log("🖼️  Updating product images...\n");

  for (const [slug, imageUrl] of Object.entries(imageMap)) {
    const result = await db
      .update(schema.products)
      .set({ imageUrl })
      .where(eq(schema.products.slug, slug))
      .returning({ name: schema.products.name });

    if (result.length) {
      console.log(`  ✓ ${result[0].name} → ${imageUrl}`);
    } else {
      console.log(`  ✗ ${slug} — not found`);
    }
  }

  console.log("\n✅ Done!");
}

updateImages().catch(console.error);
