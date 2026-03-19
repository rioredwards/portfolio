import { describe, expect, it } from "vitest";
import { buildQueryHref, readSingleParam } from "../query-params";

describe("buildQueryHref", () => {
  it("returns base path with no params", () => {
    expect(buildQueryHref("/work", {})).toBe("/work");
  });

  it("appends params to the path", () => {
    expect(buildQueryHref("/work", { category: "Web App" })).toBe(
      "/work?category=Web+App",
    );
  });

  it("omits null and undefined params", () => {
    expect(
      buildQueryHref("/work", { category: null, sort: undefined, page: 2 }),
    ).toBe("/work?page=2");
  });

  it("omits empty string params", () => {
    expect(buildQueryHref("/work", { sort: "", page: 1 })).toBe("/work?page=1");
  });

  it("handles multiple params", () => {
    const href = buildQueryHref("/blog", {
      tag: "React",
      sort: "newest",
      q: "hooks",
      page: 2,
    });
    expect(href).toContain("tag=React");
    expect(href).toContain("sort=newest");
    expect(href).toContain("q=hooks");
    expect(href).toContain("page=2");
    expect(href.startsWith("/blog?")).toBe(true);
  });

  it("converts numbers to strings", () => {
    expect(buildQueryHref("/work", { page: 3 })).toBe("/work?page=3");
  });
});

describe("readSingleParam", () => {
  it("returns undefined for undefined input", () => {
    expect(readSingleParam(undefined)).toBeUndefined();
  });

  it("returns the string directly for string input", () => {
    expect(readSingleParam("hello")).toBe("hello");
  });

  it("returns the first element for array input", () => {
    expect(readSingleParam(["first", "second"])).toBe("first");
  });
});
