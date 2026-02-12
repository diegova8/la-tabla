import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, productImages, tablaRules, tablaFixedIngredients, ingredients, categories } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/product-gallery";
import { TablaBuilderWrapper } from "./tabla-builder-wrapper";
import { Users } from "lucide-react";
import { PRODUCT_TYPES } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getTabla(slug: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.slug, slug),
        eq(products.type, PRODUCT_TYPES.TABLA),
        eq(products.isActive, true)
      )
    )
    .limit(1);

  if (!product) return null;

  const [images, rules, fixedIngredients] = await Promise.all([
    db.select().from(productImages).where(eq(productImages.productId, product.id)).orderBy(productImages.displayOrder),
    db.select({
      id: tablaRules.id,
      productId: tablaRules.productId,
      categoryId: tablaRules.categoryId,
      quantity: tablaRules.quantity,
      categoryName: categories.name,
      categorySlug: categories.slug,
    }).from(tablaRules)
      .innerJoin(categories, eq(tablaRules.categoryId, categories.id))
      .where(eq(tablaRules.productId, product.id)),
    db.select({
      id: tablaFixedIngredients.id,
      ingredientName: ingredients.name,
      ingredientId: ingredients.id,
      categoryName: categories.name,
    }).from(tablaFixedIngredients)
      .innerJoin(ingredients, eq(tablaFixedIngredients.ingredientId, ingredients.id))
      .innerJoin(categories, eq(ingredients.categoryId, categories.id))
      .where(eq(tablaFixedIngredients.productId, product.id)),
  ]);

  // Get available ingredients for configurable tablas
  let availableIngredients: Record<number, { id: number; name: string; imageUrl: string | null; categoryId: number }[]> = {};
  if (product.isConfigurable && rules.length > 0) {
    const categoryIds = rules.map((r) => r.categoryId);
    const allIngredients = await db
      .select()
      .from(ingredients)
      .where(eq(ingredients.available, true));

    for (const catId of categoryIds) {
      availableIngredients[catId] = allIngredients
        .filter((i) => i.categoryId === catId)
        .map((i) => ({ id: i.id, name: i.name, imageUrl: i.imageUrl, categoryId: i.categoryId }));
    }
  }

  return { product, images, rules, fixedIngredients, availableIngredients };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTabla(slug);
  if (!data) return { title: "Tabla no encontrada" };

  return {
    title: data.product.name,
    description: data.product.shortDesc || data.product.description,
    openGraph: {
      title: data.product.name,
      description: data.product.shortDesc || data.product.description || "",
      images: data.product.imageUrl ? [data.product.imageUrl] : [],
    },
  };
}

export default async function TablaDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getTabla(slug);
  if (!data) notFound();

  const { product, images, rules, fixedIngredients, availableIngredients } = data;

  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <ProductGallery images={images} productName={product.name} />

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              {product.isConfigurable && (
                <Badge variant="gold">Personalizable</Badge>
              )}
              {(product.personsMin || product.personsMax) && (
                <span className="inline-flex items-center gap-1 text-sm text-stone-500">
                  <Users className="h-4 w-4" />
                  {product.personsMin === product.personsMax
                    ? product.personsMin
                    : `${product.personsMin}-${product.personsMax}`}{" "}
                  personas
                </span>
              )}
            </div>

            <Heading level={1} className="text-3xl sm:text-4xl">
              {product.name}
            </Heading>

            <Price amount={product.price} size="lg" className="mt-4 block" />

            {product.description && (
              <p className="mt-4 text-stone-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Fixed ingredients */}
            {fixedIngredients.length > 0 && (
              <div className="mt-6">
                <Heading level={4} className="mb-3">
                  Ingredientes incluidos
                </Heading>
                <ul className="space-y-1">
                  {fixedIngredients.map((fi) => (
                    <li key={fi.id} className="text-sm text-stone-600 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      {fi.ingredientName}
                      <span className="text-stone-400 text-xs">({fi.categoryName})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Builder or Add to cart */}
            <div className="mt-8">
              <TablaBuilderWrapper
                product={{
                  id: product.id,
                  name: product.name,
                  price: parseFloat(product.price),
                  imageUrl: product.imageUrl,
                  isConfigurable: product.isConfigurable ?? false,
                }}
                rules={rules.map((r) => ({
                  categoryId: r.categoryId,
                  categoryName: r.categoryName,
                  quantity: r.quantity,
                }))}
                availableIngredients={availableIngredients}
              />
            </div>
          </div>
        </div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: product.imageUrl,
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </Container>
    </section>
  );
}
