import { describe, expect, it } from "vitest";
import { sortBlogs, sortProjects } from "../sorting";

describe("sortProjects", () => {
  const projects = [
    { title: "Zebra", category: "Web App", order: 2 },
    { title: "Alpha", category: "CLI Tool", order: 1 },
    { title: "Mango", category: "Web App", order: 3 },
    { title: "Beta", category: "CLI Tool" },
  ];

  it("sorts by order (curated) by default", () => {
    const result = sortProjects(projects);
    expect(result.map((p) => p.title)).toEqual([
      "Alpha",
      "Zebra",
      "Mango",
      "Beta",
    ]);
  });

  it("sorts by order when given an invalid sort value", () => {
    const result = sortProjects(projects, "invalid");
    expect(result.map((p) => p.title)).toEqual([
      "Alpha",
      "Zebra",
      "Mango",
      "Beta",
    ]);
  });

  it("sorts by name alphabetically", () => {
    const result = sortProjects(projects, "name");
    expect(result.map((p) => p.title)).toEqual([
      "Alpha",
      "Beta",
      "Mango",
      "Zebra",
    ]);
  });

  it("sorts by category then name", () => {
    const result = sortProjects(projects, "category");
    expect(result.map((p) => p.title)).toEqual([
      "Alpha",
      "Beta",
      "Mango",
      "Zebra",
    ]);
  });

  it("does not mutate the original array", () => {
    const original = [...projects];
    sortProjects(projects, "name");
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
