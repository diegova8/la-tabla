"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";

interface Category {
  id: number;
  name: string;
  slug: string;
  displayOrder: number | null;
  ingredientCount: number;
}

export function CategoriasClient({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState("");
  const [formOrder, setFormOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openNew = () => {
    setEditCategory(null);
    setFormName("");
    setFormOrder(0);
    setError("");
    setShowForm(true);
  };

  const openEdit = (cat: Category) => {
    setEditCategory(cat);
    setFormName(cat.name);
    setFormOrder(cat.displayOrder ?? 0);
    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const url = editCategory
        ? `/api/categories/${editCategory.id}`
        : "/api/categories";
      const method = editCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, displayOrder: formOrder }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      setShowForm(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta categoría?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Error al eliminar");
        return;
      }
      router.refresh();
    } catch {
      alert("Error de conexión");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Categorías</Heading>
        <Button variant="gold" onClick={openNew}>
          <Plus className="h-4 w-4" />
          Nueva categoría
        </Button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              {editCategory ? "Editar categoría" : "Nueva categoría"}
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ej: Quesos, Embutidos, Frutas..."
              />
              <Input
                label="Orden de display"
                type="number"
                value={formOrder}
                onChange={(e) => setFormOrder(parseInt(e.target.value) || 0)}
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="gold" loading={loading}>
                  {editCategory ? "Guardar" : "Crear"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {categories.length === 0 ? (
        <EmptyState
          icon={<Tag className="h-12 w-12" />}
          title="No hay categorías"
          description="Creá tu primera categoría para organizar ingredientes y productos."
          action={
            <Button variant="gold" onClick={openNew}>
              Crear categoría
            </Button>
          }
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left">
                  <th className="px-6 py-3 font-medium text-stone-500">Nombre</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Slug</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Ingredientes</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Orden</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-stone-500 font-mono text-xs">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{cat.ingredientCount}</Badge>
                    </td>
                    <td className="px-6 py-4 text-stone-500">{cat.displayOrder}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(cat)}
                          className="p-1 text-stone-400 hover:text-amber-700"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1 text-stone-400 hover:text-red-600"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
