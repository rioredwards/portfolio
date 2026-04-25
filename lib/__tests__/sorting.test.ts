import { describe, expect, it } from "vitest";
import { sortBlogs, sortProjects } from "../sorting";

describe("sortProjects", () => {
  const projects = [
    { title: "Zebra", category: "Web App", order: 2 },
    { title: "Alpha", category: "CLI Tool", order: 1 },
    { title: "Mango", category: "Web App", order: 3 },
    { title: "Beta", category: "CLI Tool" },
  ];

  it("sorts by recent (reverse curated order) by default", () => {
    const result = sortProjects(projects);
    expect(result.map((p) => p.title)).toEqual([
      "Beta",
      "Mango",
      "Zebra",
      "Alpha",
    ]);
  });

  it("sorts by recent when given an invalid sort value", () => {
    const result = sortProjects(projects, "invalid");
    expect(result.map((p) => p.title)).toEqual([
      "Beta",
      "Mango",
      "Zebra",
      "Alpha",
    ]);
  });

  it("sorts by curated order for oldest", () => {
    const result = sortProjects(projects, "oldest");
    expect(result.map((p) => p.title)).toEqual([
      "Alpha",
      "Zebra",
      "Mango",
      "Beta",
    ]);
  });

  it("sorts by name A-Z", () => {
    const result = sortProjects(projects, "name_asc");
    expect(result.map((p) => p.title)).toEqual([
      "Alpha",
      "Beta",
      "Mango",
      "Zebra",
    ]);
  });

  it("sorts by name Z-A", () => {
    const result = sortProjects(projects, "name_desc");
    expect(result.map((p) => p.title)).toEqual([
      "Zebra",
      "Mango",
      "Beta",
      "Alpha",
    ]);
  });

  it("does not mutate the original array", () => {
    const original = [...projects];
    sortProjects(projects, "name_asc");
    expect(projects).toEqual(original);
  });
});

describe("sortBlogs", () => {
  const blogs = [
    { title: "Zebra Post", order: 2 },
    { title: "Alpha Post", order: 1 },
    { title: "Mango Post", order: 3 },
  ];

  const dates: Record<string, string> = {
    "Zebra Post": "2024-03-15",
    "Alpha Post": "2024-01-10",
    "Mango Post": "2024-06-20",
  };

  const getDate = (item: { title: string }) => dates[item.title];

  it("sorts by order (curated) by default", () => {
    const result = sortBlogs(blogs);
    expect(result.map((b) => b.title)).toEqual([
      "Alpha Post",
      "Zebra Post",
      "Mango Post",
    ]);
  });

  it("sorts newest first", () => {
    const result = sortBlogs(blogs, "newest", getDate);
    expect(result.map((b) => b.title)).toEqual([
      "Mango Post",
      "Zebra Post",
      "Alpha Post",
    ]);
  });

  it("sorts oldest first", () => {
    const result = sortBlogs(blogs, "oldest", getDate);
    expect(result.map((b) => b.title)).toEqual([
      "Alpha Post",
      "Zebra Post",
      "Mango Post",
    ]);
  });

  it("sorts by name alphabetically", () => {
    const result = sortBlogs(blogs, "name");
    expect(result.map((b) => b.title)).toEqual([
      "Alpha Post",
      "Mango Post",
      "Zebra Post",
    ]);
  });

  it("falls back to curated for invalid sort value", () => {
    const result = sortBlogs(blogs, "bogus");
    expect(result.map((b) => b.title)).toEqual([
      "Alpha Post",
      "Zebra Post",
      "Mango Post",
    ]);
  });
});
