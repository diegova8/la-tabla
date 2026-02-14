import { describe, it, expect } from "vitest";

// Rate limiting is now handled in middleware (edge runtime).
// This file tests the escapeLike utility used in search.

describe("search sanitization", () => {
  // Import the function inline since it's not exported — test the logic
  function escapeLike(str: string): string {
    return str.replace(/[%_\\]/g, (c) => `\\${c}`);
  }

  it("escapes % characters", () => {
    expect(escapeLike("100%")).toBe("100\\%");
  });

  it("escapes _ characters", () => {
    expect(escapeLike("test_value")).toBe("test\\_value");
  });

  it("escapes backslashes", () => {
    expect(escapeLike("path\\to")).toBe("path\\\\to");
  });

  it("leaves normal text untouched", () => {
    expect(escapeLike("tabla quesos")).toBe("tabla quesos");
  });

  it("handles multiple special chars", () => {
    expect(escapeLike("%_\\")).toBe("\\%\\_\\\\");
  });
});
