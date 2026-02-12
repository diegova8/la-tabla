"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";
import type { Category, Ingredient, TablaRule } from "@/types";

interface IngredientsByCategory {
  category: Category;
  rule: TablaRule;
  ingredients: Ingredient[];
}

interface IngredientPickerProps {
  groups: IngredientsByCategory[];
  selected: Record<number, number[]>; // categoryId → ingredientIds
  onChange: (selected: Record<number, number[]>) => void;
}

export function IngredientPicker({
  groups,
  selected,
  onChange,
}: IngredientPickerProps) {
  const toggleIngredient = (categoryId: number, ingredientId: number, max: number) => {
    const current = selected[categoryId] || [];
    const isSelected = current.includes(ingredientId);

    let updated: number[];
    if (isSelected) {
      updated = current.filter((id) => id !== ingredientId);
    } else if (current.length < max) {
      updated = [...current, ingredientId];
    } else {
      // Replace last selected
      updated = [...current.slice(0, -1), ingredientId];
    }

    onChange({ ...selected, [categoryId]: updated });
  };

  return (
    <div className="space-y-8">
      {groups.map(({ category, rule, ingredients }) => {
        const categorySelected = selected[category.id] || [];
        const remaining = rule.quantity - categorySelected.length;

        return (
          <div key={category.id}>
            <div className="flex items-center justify-between mb-3">
              <Heading level={4}>
                {category.name}
              </Heading>
              <span
                className={cn(
                  "text-sm font-medium",
                  remaining === 0 ? "text-emerald-600" : "text-amber-700"
                )}
              >
                {categorySelected.length}/{rule.quantity} seleccionados
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ingredients.map((ingredient) => {
                const isSelected = categorySelected.includes(ingredient.id);
                return (
                  <button
                    key={ingredient.id}
                    onClick={() =>
                      toggleIngredient(category.id, ingredient.id, rule.quantity)
                    }
                    className={cn(
                      "relative flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all",
                      isSelected
                        ? "border-amber-700 bg-amber-50"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    )}
                  >
                    {ingredient.imageUrl && (
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={ingredient.imageUrl}
                          alt={ingredient.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium text-stone-800">
                      {ingredient.name}
                    </span>
                    {isSelected && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-amber-700" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
