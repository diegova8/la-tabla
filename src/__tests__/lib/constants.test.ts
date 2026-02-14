import { describe, it, expect } from "vitest";
import {
  PRODUCT_TYPES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  DELIVERY_METHODS,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
} from "@/lib/constants";

describe("constants", () => {
  it("has all product types", () => {
    expect(PRODUCT_TYPES).toEqual({
      TABLA: "tabla",
      ESPECIALIDAD: "especialidad",
      SERVICIO: "servicio",
      TALLER: "taller",
    });
  });

  it("has all order statuses", () => {
    expect(Object.keys(ORDER_STATUS)).toHaveLength(6);
    expect(ORDER_STATUS.PENDING).toBe("pending");
    expect(ORDER_STATUS.CANCELLED).toBe("cancelled");
  });

  it("has labels for every order status", () => {
    for (const status of Object.values(ORDER_STATUS)) {
      expect(ORDER_STATUS_LABELS[status]).toBeDefined();
    }
  });

  it("has labels for every payment status", () => {
    for (const status of Object.values(PAYMENT_STATUS)) {
      expect(PAYMENT_STATUS_LABELS[status]).toBeDefined();
    }
  });

  it("has delivery methods", () => {
    expect(DELIVERY_METHODS.DELIVERY).toBe("delivery");
    expect(DELIVERY_METHODS.PICKUP).toBe("pickup");
  });

  it("has payment methods", () => {
    expect(PAYMENT_METHODS.SINPE).toBe("sinpe");
    expect(PAYMENT_METHODS.TRANSFER).toBe("transfer");
  });
});
