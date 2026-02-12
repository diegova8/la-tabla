"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";

interface Category {
  id: number;
  name: string;
}

interface Ingredient {
  id?: number;
  name: string;
  categoryId: number | string;
  cost: string;
  costUnit: string;
  imageUrl: string;
  available: boolean;
}

const defaultIngredient: Ingredient = {
  name: "",
  categoryId: "",
  cost: "",
  costUnit: "g",
  imageUrl: "",
  available: true,
};

export function IngredientForm({
  ingredient,
  categories,
  onClose,
}: {
  ingredient?: Ingredient & { id: number };
  categories: Category[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState<Ingredient>(ingredient || defaultIngredient);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = ingredient ? `/api/ingredients/${ingredient.id}` : "/api/ingredients";
      const method = ingredient ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: parseInt(String(form.categoryId)),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error saving ingredient");
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
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
        <h2 className="text-xl font-semibold text-stone-900 mb-4">
          {ingredient ? "Editar ingrediente" : "Nuevo ingrediente"}
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nombre" required value={form.name} onChange={(e) => update("name", e.target.value)} />
          <Select
            label="Categoría"
            required
            options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
            value={String(form.categoryId)}
            onChange={(e) => update("categoryId", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Costo" type="number" step="0.01" required value={form.cost} onChange={(e) => update("cost", e.target.value)} />
            <Select
              label="Unidad"
              options={[
                { value: "g", label: "Gramos (g)" },
                { value: "u", label: "Unidad (u)" },
                { value: "ml", label: "Mililitros (ml)" },
              ]}
              value={form.costUnit}
              onChange={(e) => update("costUnit", e.target.value)}
            />
          </div>
          <ImageUpload
            label="Imagen"
            value={form.imageUrl}
            onChange={(url) => update("imageUrl", url)}
          />
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" checked={form.available} onChange={(e) => update("available", e.target.checked)} className="rounded border-stone-300" />
            Disponible
          </label>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="gold" loading={loading}>
              {ingredient ? "Guardar" : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
