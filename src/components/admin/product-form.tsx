"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { slugify } from "@/lib/utils";

interface Product {
  id?: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  shortDesc: string;
  price: string;
  personsMin: number | null;
  personsMax: number | null;
  isConfigurable: boolean;
  isFixed: boolean;
  displayOrder: number;
  imageUrl: string;
}

const defaultProduct: Product = {
  name: "",
  slug: "",
  type: "tabla",
  description: "",
  shortDesc: "",
  price: "",
  personsMin: null,
  personsMax: null,
  isConfigurable: false,
  isFixed: false,
  displayOrder: 0,
  imageUrl: "",
};

export function ProductForm({ product, onClose }: { product?: Product & { id: number }; onClose: () => void }) {
  const router = useRouter();
  const [form, setForm] = useState<Product>(product || defaultProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: any) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !product) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error saving product");
      }

      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold text-stone-900 mb-4">
          {product ? "Editar producto" : "Nuevo producto"}
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nombre" required value={form.name} onChange={(e) => update("name", e.target.value)} />
            <Input label="Slug" required value={form.slug} onChange={(e) => update("slug", e.target.value)} />
            <Select
              label="Tipo"
              options={[
                { value: "tabla", label: "Tabla" },
                { value: "especialidad", label: "Especialidad" },
                { value: "servicio", label: "Servicio" },
                { value: "taller", label: "Taller" },
              ]}
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            />
            <Input label="Precio" type="number" step="0.01" required value={form.price} onChange={(e) => update("price", e.target.value)} />
            <Input label="Personas mín" type="number" value={form.personsMin ?? ""} onChange={(e) => update("personsMin", e.target.value ? parseInt(e.target.value) : null)} />
            <Input label="Personas máx" type="number" value={form.personsMax ?? ""} onChange={(e) => update("personsMax", e.target.value ? parseInt(e.target.value) : null)} />
            <Input label="Orden de display" type="number" value={form.displayOrder} onChange={(e) => update("displayOrder", parseInt(e.target.value) || 0)} />
          </div>

          <Input label="Descripción corta" value={form.shortDesc} onChange={(e) => update("shortDesc", e.target.value)} />
          <Textarea label="Descripción" value={form.description} onChange={(e) => update("description", e.target.value)} />

          <ImageUpload
            label="Imagen del producto"
            value={form.imageUrl}
            onChange={(url) => update("imageUrl", url)}
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={form.isConfigurable} onChange={(e) => update("isConfigurable", e.target.checked)} className="rounded border-stone-300" />
              Configurable
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input type="checkbox" checked={form.isFixed} onChange={(e) => update("isFixed", e.target.checked)} className="rounded border-stone-300" />
              Fija
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="gold" loading={loading}>
              {product ? "Guardar cambios" : "Crear producto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
