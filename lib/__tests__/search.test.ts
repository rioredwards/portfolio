import { describe, expect, it } from "vitest";
import { searchBlogs, searchProjects } from "../search";

describe("searchProjects", () => {
  const projects = [
    {
      title: "Dog Town",
      description: "A social network for dogs",
      category: "Web App",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      title: "CLI Dashboard",
      description: "Terminal-based project dashboard",
      category: "CLI Tool",
      skills: ["Go", "Cobra"],
    },
    {
      title: "Photo Gallery",
      description: "A responsive image gallery built with React",
      category: "Web App",
      skills: ["React", "CSS", "Cloudinary"],
    },
  ];

  it("returns all items when query is undefined", () => {
    expect(searchProjects(projects)).toEqual(projects);
  });

  it("returns all items when query is empty string", () => {
    expect(searchProjects(projects, "")).toEqual(projects);
  });

  it("returns all items when query is whitespace", () => {
    expect(searchProjects(projects, "   ")).toEqual(projects);
  });

  it("matches by title", () => {
    const result = searchProjects(projects, "dog");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Dog Town");
  });

  it("matches by description", () => {
    const result = searchProjects(projects, "terminal");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("CLI Dashboard");
  });

  it("matches by category", () => {
    const result = searchProjects(projects, "CLI Tool");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("CLI Dashboard");
  });

  it("matches by skill", () => {
    const result = searchProjects(projects, "cobra");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("CLI Dashboard");
  });

  it("is case-insensitive", () => {
    const result = searchProjects(projects, "REACT");
    expect(result).toHaveLength(2);
  });

  it("returns empty array when nothing matches", () => {
    expect(searchProjects(projects, "zzzznotfound")).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original = [...projects];
    searchProjects(projects, "dog");
    expect(projects).toEqual(original);
  });
});

describe("searchBlogs", () => {
  const blogs = [
    {
      title: "Understanding DNS",
      description: "How domain name resolution works",
    },
    {
      title: "React Hooks Deep Dive",
      description: "Advanced patterns for hooks",
    },
    {
      title: "Go Concurrency",
      description: "Goroutines and channels explained",
    },
  ];

  const tags: Record<string, string[]> = {
    "Understanding DNS": ["Networking", "Infrastructure"],
    "React Hooks Deep Dive": ["React", "Frontend"],
    "Go Concurrency": ["Go", "Backend"],
  };

  const getTags = (item: { title: string }) => tags[item.title] ?? [];

  it("returns all items when query is undefined", () => {
    expect(searchBlogs(blogs)).toEqual(blogs);
  });

  it("matches by title", () => {
    const result = searchBlogs(blogs, "dns", getTags);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Understanding DNS");
  });

  it("matches by description", () => {
    const result = searchBlogs(blogs, "goroutines", getTags);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Go Concurrency");
  });

  it("matches by tag", () => {
    const result = searchBlogs(blogs, "frontend", getTags);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("React Hooks Deep Dive");
  });

  it("is case-insensitive", () => {
    const result = searchBlogs(blogs, "REACT", getTags);
    expect(result).toHaveLength(1);
  });

  it("works without getTags function", () => {
    const result = searchBlogs(blogs, "hooks");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("React Hooks Deep Dive");
  });

  it("returns empty array when nothing matches", () => {
    expect(searchBlogs(blogs, "xyznotfound", getTags)).toEqual([]);
  });
});
