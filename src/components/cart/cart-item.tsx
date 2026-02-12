"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Price } from "@/components/ui/price";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Badge } from "@/components/ui/badge";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-stone-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl">🧀</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-stone-900 truncate">
            {item.name}
          </h3>
          <IconButton label="Eliminar" size="sm" onClick={onRemove}>
            <Trash2 className="h-4 w-4 text-stone-400 hover:text-red-500" />
          </IconButton>
        </div>

        {/* Selected ingredients */}
        {item.selectedIngredients && item.selectedIngredients.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {item.selectedIngredients.map((ing) => (
              <Badge key={ing.ingredientId} variant="default" className="text-[10px]">
                {ing.name}
              </Badge>
            ))}
          </div>
        )}

        {item.notes && (
          <p className="mt-1 text-xs text-stone-400 italic">{item.notes}</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector value={item.quantity} onChange={onUpdateQuantity} />
          <Price amount={item.price * item.quantity} size="sm" />
        </div>
      </div>
    </div>
  );
}
