import { describe, it, expect } from "vitest";
import {
  createOrderSchema,
  createProductSchema,
  createIngredientSchema,
  createCategorySchema,
  createBlockedDateSchema,
  updateOrderStatusSchema,
} from "@/lib/validations";

describe("createOrderSchema", () => {
  const validOrder = {
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "88887777",
    deliveryMethod: "delivery" as const,
    deliveryDate: "2026-03-01",
    items: [
      { productId: 1, unitPrice: 25, quantity: 1 },
    ],
  };

  it("accepts a valid order", () => {
    const result = createOrderSchema.safeParse(validOrder);
    expect(result.success).toBe(true);
  });

  it("rejects missing name", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, email: "notanemail" });
    expect(result.success).toBe(false);
  });

  it("rejects empty items array", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, items: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid delivery date format", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, deliveryDate: "01-03-2026" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid delivery method", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, deliveryMethod: "drone" });
    expect(result.success).toBe(false);
  });

  it("accepts order with selected ingredients", () => {
    const order = {
      ...validOrder,
      items: [{
        productId: 1,
        unitPrice: 30,
        quantity: 1,
        selectedIngredients: [
          { ingredientId: 5, categoryId: 2 },
          { ingredientId: 8, categoryId: 3 },
        ],
      }],
    };
    const result = createOrderSchema.safeParse(order);
    expect(result.success).toBe(true);
  });

  it("rejects negative unit price", () => {
    const result = createOrderSchema.safeParse({
      ...validOrder,
      items: [{ productId: 1, unitPrice: -10, quantity: 1 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects zero quantity", () => {
    const result = createOrderSchema.safeParse({
      ...validOrder,
      items: [{ productId: 1, unitPrice: 25, quantity: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional notes", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, notes: "Sin cebolla" });
    expect(result.success).toBe(true);
  });

  it("rejects notes over 1000 chars", () => {
    const result = createOrderSchema.safeParse({ ...validOrder, notes: "a".repeat(1001) });
    expect(result.success).toBe(false);
  });
});

describe("createProductSchema", () => {
  const validProduct = {
    name: "Tabla Clásica",
    slug: "tabla-clasica",
    type: "tabla" as const,
    price: "25.00",
  };

  it("accepts a valid product", () => {
    const result = createProductSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("rejects invalid slug characters", () => {
    const result = createProductSchema.safeParse({ ...validProduct, slug: "Tabla Clásica!" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid product type", () => {
    const result = createProductSchema.safeParse({ ...validProduct, type: "bebida" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid price format", () => {
    const result = createProductSchema.safeParse({ ...validProduct, price: "abc" });
    expect(result.success).toBe(false);
  });

  it("accepts price without decimals", () => {
    const result = createProductSchema.safeParse({ ...validProduct, price: "25" });
    expect(result.success).toBe(true);
  });
});

describe("createIngredientSchema", () => {
  it("accepts valid ingredient", () => {
    const result = createIngredientSchema.safeParse({
      name: "Queso Brie",
      categoryId: 1,
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing category", () => {
    const result = createIngredientSchema.safeParse({ name: "Queso" });
    expect(result.success).toBe(false);
  });
});

describe("createCategorySchema", () => {
  it("accepts valid category", () => {
    const result = createCategorySchema.safeParse({ name: "Quesos" });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = createCategorySchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
  });
});

describe("createBlockedDateSchema", () => {
  it("accepts valid date", () => {
    const result = createBlockedDateSchema.safeParse({ date: "2026-12-25" });
    expect(result.success).toBe(true);
  });

  it("rejects bad date format", () => {
    const result = createBlockedDateSchema.safeParse({ date: "25/12/2026" });
    expect(result.success).toBe(false);
  });
});

describe("updateOrderStatusSchema", () => {
  it("accepts valid status", () => {
    const result = updateOrderStatusSchema.safeParse({ status: "confirmed" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid status", () => {
    const result = updateOrderStatusSchema.safeParse({ status: "shipped" });
    expect(result.success).toBe(false);
  });

  it("accepts payment status", () => {
    const result = updateOrderStatusSchema.safeParse({ paymentStatus: "verified" });
    expect(result.success).toBe(true);
  });
});
