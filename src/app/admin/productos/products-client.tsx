"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { EmptyState } from "@/components/ui/empty-state";
import { Package } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";

interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string | null;
  shortDesc: string | null;
  price: string;
  imageUrl: string | null;
  personsMin: number | null;
  personsMax: number | null;
  isConfigurable: boolean | null;
  isFixed: boolean | null;
  isActive: boolean | null;
  displayOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export function ProductsClient({ products, typeLabels }: { products: Product[]; typeLabels: Record<string, string> }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Desactivar este producto?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Error al eliminar producto");
        return;
      }
      router.refresh();
    } catch (err) {
      alert("Error de conexión al eliminar producto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Productos</Heading>
        <Button variant="gold" onClick={() => { setEditProduct(null); setShowForm(true); }}>
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      {showForm && (
        <ProductForm
          product={editProduct ? {
            id: editProduct.id,
            name: editProduct.name,
            slug: editProduct.slug,
            type: editProduct.type,
            description: editProduct.description || "",
            shortDesc: editProduct.shortDesc || "",
            price: editProduct.price,
            personsMin: editProduct.personsMin,
            personsMax: editProduct.personsMax,
            isConfigurable: editProduct.isConfigurable ?? false,
            isFixed: editProduct.isFixed ?? false,
            displayOrder: editProduct.displayOrder ?? 0,
            imageUrl: (editProduct as any).imageUrl ?? "",
          } : undefined}
          onClose={() => setShowForm(false)}
        />
      )}

      {products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-12 w-12" />}
          title="No hay productos"
          description="Creá tu primer producto para empezar a vender."
          action={<Button variant="gold" onClick={() => setShowForm(true)}>Crear producto</Button>}
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left">
                  <th className="px-6 py-3 font-medium text-stone-500">Producto</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Tipo</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Precio</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Estado</th>
                  <th className="px-6 py-3 font-medium text-stone-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-stone-100">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="40px" />
                          ) : (
                            <span className="flex h-full items-center justify-center text-lg">🧀</span>
                          )}
                        </div>
                        <span className="font-medium text-stone-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{typeLabels[product.type] || product.type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Price amount={product.price} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.isActive ? "success" : "default"}>
                        {product.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(product)} className="p-1 text-stone-400 hover:text-amber-700">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1 text-stone-400 hover:text-red-600">
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
