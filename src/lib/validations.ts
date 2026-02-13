import { z } from "zod";

// Products
export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  type: z.enum(["tabla", "especialidad", "servicio", "taller"]),
  description: z.string().max(2000).optional().default(""),
  shortDesc: z.string().max(300).optional().default(""),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  imageUrl: z.string().url().optional().or(z.literal("")),
  personsMin: z.number().int().positive().nullable().optional(),
  personsMax: z.number().int().positive().nullable().optional(),
  isConfigurable: z.boolean().optional().default(false),
  isFixed: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
});

export const updateProductSchema = createProductSchema.partial().extend({
  isActive: z.boolean().optional(),
});

// Ingredients
export const createIngredientSchema = z.object({
  name: z.string().min(1).max(200),
  categoryId: z.number().int().positive(),
  description: z.string().max(500).nullable().optional(),
  imageUrl: z.string().url().nullable().optional().or(z.literal("")),
  cost: z.string().regex(/^\d+(\.\d{1,2})?$/).optional().default("0"),
  costUnit: z.enum(["g", "u", "ml"]).optional().default("u"),
  available: z.boolean().optional().default(true),
});

export const updateIngredientSchema = createIngredientSchema.partial();

// Categories
export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().optional().default(0),
});

export const updateCategorySchema = createCategorySchema.partial();

// Orders
export const createOrderSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(4).max(20),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  deliverySlot: z.string().optional(),
  address: z.string().max(500).optional(),
  paymentMethod: z.enum(["sinpe", "transfer"]).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive().nullable().optional(),
    quantity: z.number().int().positive().optional().default(1),
    unitPrice: z.coerce.number().positive(),
    selectedIngredients: z.array(z.object({
      ingredientId: z.number().int().positive(),
      categoryId: z.number().int().positive(),
    })).optional(),
    notes: z.string().max(500).optional(),
  })).min(1),
});

// Blocked dates
export const createBlockedDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().max(200).optional(),
});

// Order status update
export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"]).optional(),
  paymentStatus: z.enum(["pending", "verified", "rejected"]).optional(),
});
