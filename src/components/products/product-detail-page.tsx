import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, productImages } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Container } from "@/components/ui/container";
import { ProductDetail } from "@/components/products/product-detail";
import { ProductGallery } from "@/components/products/product-gallery";

interface ProductDetailPageConfig {
  type: string;
  notFoundTitle: string;
  fallbackEmoji: string;
}

async function getProduct(slug: string, type: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.slug, slug),
        eq(products.type, type),
        eq(products.isActive, true)
      )
    )
    .limit(1);

  if (!product) return null;

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, product.id))
    .orderBy(productImages.displayOrder);

  return { product, images };
}

export async function generateProductMetadata(
  slug: string,
  config: ProductDetailPageConfig
): Promise<Metadata> {
  const data = await getProduct(slug, config.type);
  if (!data) return { title: config.notFoundTitle };

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

export async function ProductDetailPage({
  slug,
  config,
}: {
  slug: string;
  config: ProductDetailPageConfig;
}) {
  const data = await getProduct(slug, config.type);
  if (!data) notFound();

  const { product, images } = data;

  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {images.length > 0 ? (
            <ProductGallery images={images} productName={product.name} />
          ) : product.imageUrl ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className="aspect-[4/3] rounded-xl bg-stone-100 flex items-center justify-center">
              <span className="text-6xl">{config.fallbackEmoji}</span>
            </div>
          )}

          <ProductDetail product={product} />
        </div>

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
