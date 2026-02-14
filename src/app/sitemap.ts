import type { MetadataRoute } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://la-tabla.vercel.app";

const typeToPath: Record<string, string> = {
  tabla: "tablas",
  especialidad: "especialidades",
  servicio: "servicios",
  taller: "talleres",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await db
    .select({ slug: products.slug, type: products.type, updatedAt: products.updatedAt })
    .from(products)
    .where(eq(products.isActive, true));

  const productUrls = allProducts.map((p) => ({
    url: `${BASE_URL}/${typeToPath[p.type] || p.type}/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/tablas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/especialidades`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/servicios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/talleres`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...productUrls,
  ];
}
