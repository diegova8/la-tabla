"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IngredientPicker } from "@/components/products/ingredient-picker";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "@/components/ui/toast";

interface Rule {
  categoryId: number;
  categoryName: string;
  quantity: number;
}

interface AvailableIngredient {
  id: number;
  name: string;
  imageUrl: string | null;
  categoryId: number;
}

interface TablaBuilderWrapperProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    isConfigurable: boolean;
  };
  rules: Rule[];
  availableIngredients: Record<number, AvailableIngredient[]>;
}

export function TablaBuilderWrapper({
  product,
  rules,
  availableIngredients,
}: TablaBuilderWrapperProps) {
  const [selected, setSelected] = useState<Record<number, number[]>>({});
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const isComplete =
    !product.isConfigurable ||
    rules.every((rule) => (selected[rule.categoryId]?.length || 0) === rule.quantity);

  const handleAddToCart = () => {
    const selectedIngredients = product.isConfigurable
      ? Object.entries(selected).flatMap(([catId, ids]) =>
          ids.map((ingredientId) => {
            const catIngredients = availableIngredients[Number(catId)] || [];
            const ingredient = catIngredients.find((i) => i.id === ingredientId);
            return {
              ingredientId,
              categoryId: Number(catId),
              name: ingredient?.name || "",
            };
          })
        )
      : undefined;

    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl || undefined,
      selectedIngredients,
      notes: notes || undefined,
    });

    setAdded(true);
    toast(`${product.name} agregado al carrito`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Ingredient picker for configurable tablas */}
      {product.isConfigurable && rules.length > 0 && (
        <IngredientPicker
          groups={rules.map((rule) => ({
            category: { id: rule.categoryId, name: rule.categoryName, slug: "", displayOrder: 0 },
            rule: { id: 0, productId: product.id, categoryId: rule.categoryId, quantity: rule.quantity },
            ingredients: (availableIngredients[rule.categoryId] || []).map((i) => ({
              id: i.id,
              name: i.name,
              imageUrl: i.imageUrl,
              categoryId: i.categoryId,
              cost: "0",
              costUnit: "u",
              description: null,
              available: true,
              createdAt: null,
              updatedAt: null,
            })),
          }))}
          selected={selected}
          onChange={setSelected}
        />
      )}

      {/* Notes */}
      <Textarea
        label="Notas especiales"
        placeholder="¿Alguna alergia o preferencia especial?"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* Add to cart */}
      <Button
        variant="gold"
        size="lg"
        className="w-full"
        disabled={!isComplete}
        onClick={handleAddToCart}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            ¡Agregado al carrito!
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            {!isComplete ? "Completá tu selección" : "Agregar al carrito"}
          </>
        )}
      </Button>
    </div>
  );
}
