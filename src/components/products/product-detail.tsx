"use client";

import { useState } from "react";
import { ShoppingBag, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "@/components/ui/toast";

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    price: string;
    description: string | null;
    shortDesc: string | null;
    imageUrl: string | null;
    personsMin: number | null;
    personsMax: number | null;
    type: string;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      imageUrl: product.imageUrl || undefined,
      notes: notes || undefined,
    });

    setAdded(true);
    toast(`${product.name} agregado al carrito`);
    setTimeout(() => setAdded(false), 2000);
  };

  const typeLabels: Record<string, string> = {
    especialidad: "Especialidad del Chef",
    servicio: "Servicio",
    taller: "Taller",
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Badge variant="gold">{typeLabels[product.type] || product.type}</Badge>
        {(product.personsMin || product.personsMax) && (
          <span className="inline-flex items-center gap-1 text-sm text-stone-500">
            <Users className="h-4 w-4" />
            {product.personsMin === product.personsMax
              ? product.personsMin
              : `${product.personsMin}-${product.personsMax}`}{" "}
            personas
          </span>
        )}
      </div>

      <Heading level={1} className="text-3xl sm:text-4xl">
        {product.name}
      </Heading>

      <Price amount={product.price} size="lg" className="mt-4 block" />

      {product.description && (
        <p className="mt-4 text-stone-600 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      )}

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-stone-700">Cantidad:</span>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={20}
          />
        </div>

        <Textarea
          label="Notas especiales"
          placeholder="¿Alguna alergia, preferencia o detalle especial?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button
          variant="gold"
          size="lg"
          className="w-full"
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
              Agregar al carrito
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
