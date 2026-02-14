import { describe, it, expect, vi, beforeEach } from "vitest";

// We need to mock setInterval before importing
vi.useFakeTimers();

// Fresh import each test
let rateLimit: (key: string, limit: number, windowMs: number) => boolean;

beforeEach(async () => {
  vi.resetModules();
  const mod = await import("@/lib/rate-limit");
  rateLimit = mod.rateLimit;
});

describe("rateLimit", () => {
  it("allows requests within limit", () => {
    expect(rateLimit("test-allow", 3, 60_000)).toBe(true);
    expect(rateLimit("test-allow", 3, 60_000)).toBe(true);
    expect(rateLimit("test-allow", 3, 60_000)).toBe(true);
  });

  it("blocks requests exceeding limit", () => {
    rateLimit("test-block", 2, 60_000);
    rateLimit("test-block", 2, 60_000);
    expect(rateLimit("test-block", 2, 60_000)).toBe(false);
  });

  it("resets after window expires", () => {
    rateLimit("test-reset", 1, 1_000);
    expect(rateLimit("test-reset", 1, 1_000)).toBe(false);

    vi.advanceTimersByTime(1_001);

    expect(rateLimit("test-reset", 1, 1_000)).toBe(true);
  });

  it("tracks different keys independently", () => {
    rateLimit("key-a", 1, 60_000);
    expect(rateLimit("key-a", 1, 60_000)).toBe(false);
    expect(rateLimit("key-b", 1, 60_000)).toBe(true);
  });
});
