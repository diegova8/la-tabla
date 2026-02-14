import type { Metadata } from "next";
import { PRODUCT_TYPES } from "@/lib/constants";
import {
  ProductDetailPage,
  generateProductMetadata,
} from "@/components/products/product-detail-page";

const config = {
  type: PRODUCT_TYPES.TALLER,
  notFoundTitle: "Taller no encontrado",
  fallbackEmoji: "🎓",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateProductMetadata(slug, config);
}

export default async function TallerPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetailPage slug={slug} config={config} />;
}
