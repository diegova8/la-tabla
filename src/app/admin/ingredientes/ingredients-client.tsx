"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Egg } from "lucide-react";
import { IngredientForm } from "@/components/admin/ingredient-form";

interface Ingredient {
  id: number;
  name: string;
  categoryId: number;
  cost: string;
  costUnit: string;
  imageUrl: string | null;
  available: boolean | null;
  categoryName: string;
}

interface Category {
  id: number;
  name: string;
}

export function IngredientsClient({ ingredients, categories }: { ingredients: Ingredient[]; categories: Category[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editIngredient, setEditIngredient] = useState<Ingredient | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Desactivar este ingrediente?")) return;
    await fetch(`/api/ingredients/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const handleEdit = (ing: Ingredient) => {
    setEditIngredient(ing);
    setShowForm(true);
  };

  // Group by category
  const grouped = ingredients.reduce((acc, ing) => {
    const cat = ing.categoryName;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ing);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Ingredientes</Heading>
        <Button variant="gold" onClick={() => { setEditIngredient(null); setShowForm(true); }}>
          <Plus className="h-4 w-4" />
          Nuevo ingrediente
        </Button>
      </div>

      {showForm && (
        <IngredientForm
          ingredient={editIngredient ? {
            id: editIngredient.id,
            name: editIngredient.name,
            categoryId: editIngredient.categoryId,
            cost: editIngredient.cost,
            costUnit: editIngredient.costUnit,
            imageUrl: editIngredient.imageUrl || "",
            available: editIngredient.available ?? true,
          } : undefined}
          categories={categories}
          onClose={() => setShowForm(false)}
        />
      )}

      {ingredients.length === 0 ? (
        <EmptyState
          icon={<Egg className="h-12 w-12" />}
          title="No hay ingredientes"
          description="Agregá ingredientes para empezar a crear tablas."
          action={<Button variant="gold" onClick={() => setShowForm(true)}>Agregar ingrediente</Button>}
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([categoryName, items]) => (
            <Card key={categoryName}>
              <div className="px-6 py-3 bg-stone-50 border-b border-stone-200">
                <h3 className="font-semibold text-stone-700">{categoryName}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-stone-100">
                    {items.map((ing) => (
                      <tr key={ing.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-md bg-stone-100">
                              {ing.imageUrl ? (
                                <Image src={ing.imageUrl} alt={ing.name} fill className="object-cover" sizes="32px" />
                              ) : (
                                <span className="flex h-full items-center justify-center text-sm">🧀</span>
                              )}
                            </div>
                            <span className="font-medium text-stone-900">{ing.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-stone-600">${ing.cost}/{ing.costUnit}</td>
                        <td className="px-6 py-3">
                          <Badge variant={ing.available ? "success" : "danger"}>
                            {ing.available ? "Disponible" : "No disponible"}
                          </Badge>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(ing)} className="p-1 text-stone-400 hover:text-amber-700">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(ing.id)} className="p-1 text-stone-400 hover:text-red-600">
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
          ))}
        </div>
      )}
    </>
  );
}
