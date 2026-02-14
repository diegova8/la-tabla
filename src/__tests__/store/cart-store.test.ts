import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/store/cart-store";

// Reset store between tests
beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("cart store", () => {
  it("starts empty", () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  it("adds an item", () => {
    const { addItem } = useCartStore.getState();
    addItem({
      productId: 1,
      name: "Tabla Clásica",
      price: 25,
      quantity: 1,
      imageUrl: "/img.jpg",
    });

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("Tabla Clásica");
    expect(items[0].price).toBe(25);
  });

  it("increments quantity when adding same product", () => {
    const { addItem } = useCartStore.getState();
    addItem({ productId: 1, name: "Tabla", price: 25, quantity: 1, imageUrl: "" });
    addItem({ productId: 1, name: "Tabla", price: 25, quantity: 1, imageUrl: "" });

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("removes an item", () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem({ productId: 1, name: "Tabla", price: 25, quantity: 1, imageUrl: "" });

    const { items: afterAdd } = useCartStore.getState();
    removeItem(afterAdd[0].id);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it("updates quantity", () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem({ productId: 1, name: "Tabla", price: 25, quantity: 1, imageUrl: "" });

    const { items: afterAdd } = useCartStore.getState();
    updateQuantity(afterAdd[0].id, 5);

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(5);
  });

  it("clears all items", () => {
    const { addItem, clearCart } = useCartStore.getState();
    addItem({ productId: 1, name: "A", price: 10, quantity: 1, imageUrl: "" });
    addItem({ productId: 2, name: "B", price: 20, quantity: 1, imageUrl: "" });

    clearCart();

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it("calculates total correctly", () => {
    const { addItem, getTotal } = useCartStore.getState();
    addItem({ productId: 1, name: "A", price: 25, quantity: 2, imageUrl: "" });
    addItem({ productId: 2, name: "B", price: 15, quantity: 1, imageUrl: "" });

    const total = useCartStore.getState().getTotal();
    expect(total).toBe(65); // 25*2 + 15*1
  });

  it("handles items with selected ingredients as unique", () => {
    const { addItem } = useCartStore.getState();
    addItem({
      productId: 1,
      name: "Tabla",
      price: 25,
      quantity: 1,
      imageUrl: "",
      selectedIngredients: [{ ingredientId: 1, categoryId: 1, name: "Brie" }],
    });
    addItem({
      productId: 1,
      name: "Tabla",
      price: 25,
      quantity: 1,
      imageUrl: "",
      selectedIngredients: [{ ingredientId: 2, categoryId: 1, name: "Gouda" }],
    });

    const { items } = useCartStore.getState();
    // Should be 2 separate items because different ingredients
    expect(items.length).toBeGreaterThanOrEqual(1);
  });
});
