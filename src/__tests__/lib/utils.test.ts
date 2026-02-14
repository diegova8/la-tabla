import { describe, it, expect } from "vitest";
import { formatPrice, slugify, generateOrderNumber, cn } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats integer as USD", () => {
    expect(formatPrice(25)).toBe("$25.00");
  });

  it("formats decimal", () => {
    expect(formatPrice(49.99)).toBe("$49.99");
  });

  it("formats string number", () => {
    expect(formatPrice("100")).toBe("$100.00");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("formats large numbers with comma", () => {
    expect(formatPrice(1500)).toBe("$1,500.00");
  });
});

describe("slugify", () => {
  it("converts to lowercase with dashes", () => {
    expect(slugify("Tabla Clásica")).toBe("tabla-clasica");
  });

  it("removes accents", () => {
    expect(slugify("Paella Española")).toBe("paella-espanola");
  });

  it("removes special characters", () => {
    expect(slugify("Queso & Charcutería!")).toBe("queso-charcuteria");
  });

  it("trims leading/trailing dashes", () => {
    expect(slugify("  hello world  ")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("collapses multiple spaces/dashes", () => {
    expect(slugify("tabla   de   quesos")).toBe("tabla-de-quesos");
  });
});

describe("generateOrderNumber", () => {
  it("starts with LT-", () => {
    const num = generateOrderNumber();
    expect(num).toMatch(/^LT-/);
  });

  it("contains date portion", () => {
    const num = generateOrderNumber();
    // Format: LT-YYYYMMDD-XXXXXXXX
    expect(num).toMatch(/^LT-\d{8}-[A-Z0-9]+$/);
  });

  it("generates unique numbers", () => {
    const numbers = new Set(Array.from({ length: 100 }, () => generateOrderNumber()));
    expect(numbers.size).toBe(100);
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conflicts with tailwind-merge", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });
});
