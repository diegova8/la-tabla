"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";

interface GalleryImage {
  id: number;
  imageUrl: string;
  altText: string | null;
  displayOrder: number | null;
  productId: number;
  productName: string;
}

interface ProductOption {
  id: number;
  name: string;
}

export function GaleriaClient({
  images,
  products,
}: {
  images: GalleryImage[];
  products: ProductOption[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [altText, setAltText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedProduct) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct);
      formData.append("altText", altText);

      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al subir");
      }

      setShowForm(false);
      setFile(null);
      setPreview(null);
      setSelectedProduct("");
      setAltText("");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Error al eliminar");
    } catch {
      alert("Error de conexión");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Galería</Heading>
        <Button variant="gold" onClick={() => { setShowForm(true); setError(""); }}>
          <Plus className="h-4 w-4" />
          Subir imagen
        </Button>
      </div>

      {/* Upload modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              Subir imagen
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            <form onSubmit={handleUpload} className="space-y-4">
              <Select
                label="Producto"
                required
                placeholder="Seleccioná un producto"
                options={products.map((p) => ({ value: String(p.id), label: p.name }))}
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Imagen
                </label>
                <div
                  onClick={() => document.getElementById("gallery-upload")?.click()}
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 bg-stone-50 hover:border-amber-400 cursor-pointer min-h-[120px] transition-colors"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-28 rounded-md object-contain" />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="mx-auto h-8 w-8 text-stone-400" />
                      <p className="mt-1 text-sm text-stone-500">Click para seleccionar</p>
                    </div>
                  )}
                  <input
                    id="gallery-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                  />
                </div>
              </div>

              <Input
                label="Texto alternativo (opcional)"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Descripción de la imagen"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="gold" loading={loading} disabled={!file || !selectedProduct}>
                  Subir
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {images.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="h-12 w-12" />}
          title="No hay imágenes"
          description="Subí imágenes para los productos de la tienda."
          action={<Button variant="gold" onClick={() => setShowForm(true)}>Subir imagen</Button>}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <Card key={img.id} className="overflow-hidden group relative">
              <div className="relative aspect-square">
                <Image
                  src={img.imageUrl}
                  alt={img.altText || img.productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-stone-900 truncate">{img.productName}</p>
                {img.altText && (
                  <p className="text-xs text-stone-500 truncate">{img.altText}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
