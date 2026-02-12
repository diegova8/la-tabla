import type { InferSelectModel } from "drizzle-orm";
import type {
  categories,
  ingredients,
  products,
  productImages,
  productVariants,
  tablaRules,
  tablaFixedIngredients,
  serviceConfig,
  deliverySlots,
  blockedDates,
  orders,
  orderItems,
  orderItemIngredients,
} from "@/db/schema";

// Base types from schema
export type Category = InferSelectModel<typeof categories>;
export type Ingredient = InferSelectModel<typeof ingredients>;
export type Product = InferSelectModel<typeof products>;
export type ProductImage = InferSelectModel<typeof productImages>;
export type ProductVariant = InferSelectModel<typeof productVariants>;
export type TablaRule = InferSelectModel<typeof tablaRules>;
export type TablaFixedIngredient = InferSelectModel<typeof tablaFixedIngredients>;
export type ServiceConfigType = InferSelectModel<typeof serviceConfig>;
export type DeliverySlot = InferSelectModel<typeof deliverySlots>;
export type BlockedDate = InferSelectModel<typeof blockedDates>;
export type Order = InferSelectModel<typeof orders>;
export type OrderItem = InferSelectModel<typeof orderItems>;
export type OrderItemIngredient = InferSelectModel<typeof orderItemIngredients>;

// Extended types
export type ProductWithDetails = Product & {
  images: ProductImage[];
  variants: ProductVariant[];
  tablaRules: (TablaRule & { category: Category })[];
  tablaFixedIngredients: (TablaFixedIngredient & { ingredient: Ingredient })[];
  serviceConfig: ServiceConfigType[];
};

export type IngredientWithCategory = Ingredient & {
  category: Category;
};

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product;
    variant: ProductVariant | null;
    selectedIngredients: (OrderItemIngredient & {
      ingredient: Ingredient;
      category: Category;
    })[];
  })[];
  deliverySlot: DeliverySlot | null;
};

// Cart types
export type CartItemIngredient = {
  ingredientId: number;
  categoryId: number;
  name: string;
};

export type CartItem = {
  id: string; // unique cart item ID
  productId: number;
  variantId?: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  selectedIngredients?: CartItemIngredient[];
  notes?: string;
};
