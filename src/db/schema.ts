import {
  pgTable,
  serial,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  date,
  time,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// CATEGORIES
// ============================================================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  displayOrder: integer("display_order").default(0),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  ingredients: many(ingredients),
  tablaRules: many(tablaRules),
}));

// ============================================================
// INGREDIENTS
// ============================================================
export const ingredients = pgTable(
  "ingredients",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),
    name: text("name").notNull(),
    cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
    costUnit: text("cost_unit").notNull(), // g, u, ml
    imageUrl: text("image_url"),
    description: text("description"),
    available: boolean("available").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("ingredients_category_idx").on(table.categoryId),
    index("ingredients_available_idx").on(table.available),
  ]
);

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  category: one(categories, {
    fields: [ingredients.categoryId],
    references: [categories.id],
  }),
}));

// ============================================================
// PRODUCTS
// ============================================================
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    type: text("type").notNull(), // tabla, especialidad, servicio, taller
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    description: text("description"),
    shortDesc: text("short_desc"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    imageUrl: text("image_url"),
    personsMin: integer("persons_min"),
    personsMax: integer("persons_max"),
    isConfigurable: boolean("is_configurable").default(false),
    isFixed: boolean("is_fixed").default(false),
    isActive: boolean("is_active").default(true),
    displayOrder: integer("display_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("products_type_idx").on(table.type),
    index("products_active_idx").on(table.isActive),
    index("products_slug_idx").on(table.slug),
  ]
);

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  variants: many(productVariants),
  tablaRules: many(tablaRules),
  tablaFixedIngredients: many(tablaFixedIngredients),
  serviceConfig: many(serviceConfig),
}));

// ============================================================
// PRODUCT IMAGES
// ============================================================
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  displayOrder: integer("display_order").default(0),
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

// ============================================================
// PRODUCT VARIANTS
// ============================================================
export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const productVariantsRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
  })
);

// ============================================================
// TABLA RULES (configuración por tabla)
// ============================================================
export const tablaRules = pgTable("tabla_rules", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
});

export const tablaRulesRelations = relations(tablaRules, ({ one }) => ({
  product: one(products, {
    fields: [tablaRules.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [tablaRules.categoryId],
    references: [categories.id],
  }),
}));

// ============================================================
// TABLA FIXED INGREDIENTS
// ============================================================
export const tablaFixedIngredients = pgTable("tabla_fixed_ingredients", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  ingredientId: integer("ingredient_id")
    .references(() => ingredients.id)
    .notNull(),
});

export const tablaFixedIngredientsRelations = relations(
  tablaFixedIngredients,
  ({ one }) => ({
    product: one(products, {
      fields: [tablaFixedIngredients.productId],
      references: [products.id],
    }),
    ingredient: one(ingredients, {
      fields: [tablaFixedIngredients.ingredientId],
      references: [ingredients.id],
    }),
  })
);

// ============================================================
// SERVICE CONFIG
// ============================================================
export const serviceConfig = pgTable("service_config", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  pricePerPerson: decimal("price_per_person", { precision: 10, scale: 2 }),
  minPersons: integer("min_persons"),
  includesMaterials: boolean("includes_materials").default(false),
  isVirtual: boolean("is_virtual").default(false),
  requiresQuote: boolean("requires_quote").default(false),
});

export const serviceConfigRelations = relations(serviceConfig, ({ one }) => ({
  product: one(products, {
    fields: [serviceConfig.productId],
    references: [products.id],
  }),
}));

// ============================================================
// DELIVERY SLOTS
// ============================================================
export const deliverySlots = pgTable("delivery_slots", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(), // "9:00 - 10:00 AM"
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isActive: boolean("is_active").default(true),
});

// ============================================================
// BLOCKED DATES
// ============================================================
export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  reason: text("reason"),
});

// ============================================================
// ORDERS
// ============================================================
export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").unique().notNull(),
    customerId: text("customer_id"), // Clerk user ID (nullable for guests)
    guestName: text("guest_name"),
    guestEmail: text("guest_email"),
    guestPhone: text("guest_phone"),
    status: text("status").notNull().default("pending"),
    // pending, confirmed, preparing, ready, delivered, cancelled
    deliveryMethod: text("delivery_method").notNull(), // delivery, pickup
    deliveryDate: date("delivery_date").notNull(),
    deliverySlotId: integer("delivery_slot_id").references(
      () => deliverySlots.id
    ),
    deliveryAddress: text("delivery_address"),
    deliveryCost: decimal("delivery_cost", { precision: 10, scale: 2 }).default(
      "0"
    ),
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    paymentMethod: text("payment_method"), // sinpe, transfer, gateway
    paymentProof: text("payment_proof"), // URL comprobante
    paymentStatus: text("payment_status").default("pending"),
    // pending, verified, rejected
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("orders_customer_idx").on(table.customerId),
    index("orders_status_idx").on(table.status),
    index("orders_date_idx").on(table.deliveryDate),
    index("orders_created_idx").on(table.createdAt),
  ]
);

export const ordersRelations = relations(orders, ({ many, one }) => ({
  items: many(orderItems),
  deliverySlot: one(deliverySlots, {
    fields: [orders.deliverySlotId],
    references: [deliverySlots.id],
  }),
}));

// ============================================================
// ORDER ITEMS
// ============================================================
export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .references(() => orders.id, { onDelete: "cascade" })
      .notNull(),
    productId: integer("product_id")
      .references(() => products.id)
      .notNull(),
    variantId: integer("variant_id").references(() => productVariants.id),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
    notes: text("notes"),
  },
  (table) => [index("order_items_order_idx").on(table.orderId)]
);

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [orderItems.variantId],
    references: [productVariants.id],
  }),
  selectedIngredients: many(orderItemIngredients),
}));

// ============================================================
// ORDER ITEM INGREDIENTS (ingredientes elegidos en tablas)
// ============================================================
export const orderItemIngredients = pgTable(
  "order_item_ingredients",
  {
    id: serial("id").primaryKey(),
    orderItemId: integer("order_item_id")
      .references(() => orderItems.id, { onDelete: "cascade" })
      .notNull(),
    ingredientId: integer("ingredient_id")
      .references(() => ingredients.id)
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),
  },
  (table) => [
    index("order_item_ingredients_item_idx").on(table.orderItemId),
  ]
);

export const orderItemIngredientsRelations = relations(
  orderItemIngredients,
  ({ one }) => ({
    orderItem: one(orderItems, {
      fields: [orderItemIngredients.orderItemId],
      references: [orderItems.id],
    }),
    ingredient: one(ingredients, {
      fields: [orderItemIngredients.ingredientId],
      references: [ingredients.id],
    }),
    category: one(categories, {
      fields: [orderItemIngredients.categoryId],
      references: [categories.id],
    }),
  })
);
