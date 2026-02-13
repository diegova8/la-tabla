import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { put } from "@vercel/blob";

export async function GET() {
  try {
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

    return NextResponse.json(images);
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const productId = formData.get("productId") as string;
    const altText = formData.get("altText") as string;

    if (!file || !productId) {
      return NextResponse.json({ error: "Archivo y producto requeridos" }, { status: 400 });
    }

    const blob = await put(file.name, file, { access: "public" });

    const [image] = await db.insert(productImages).values({
      productId: parseInt(productId),
      imageUrl: blob.url,
      altText: altText || null,
      displayOrder: 0,
    }).returning();

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
