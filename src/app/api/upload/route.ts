import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: Implement real upload with Vercel Blob
  // TODO: Add auth check (admin only)
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Mock response — replace with Vercel Blob upload
    const mockUrl = `/uploads/${Date.now()}-${file.name}`;

    return NextResponse.json({
      url: mockUrl,
      filename: file.name,
      size: file.size,
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
