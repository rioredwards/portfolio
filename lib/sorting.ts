import { sortByOrder } from "@/lib/content";

export interface SortOption {
  label: string;
  value: string;
}

export const WORK_SORT_OPTIONS: SortOption[] = [
  { label: "Curated", value: "" },
  { label: "Name (A-Z)", value: "name" },
  { label: "Category", value: "category" },
];

export const BLOG_SORT_OPTIONS: SortOption[] = [
  { label: "Curated", value: "" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name (A-Z)", value: "name" },
];

export function sortProjects<
  T extends { title: string; category: string; order?: number },
>(items: T[], sortValue?: string): T[] {
  switch (sortValue) {
    case "name":
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    case "category":
      return [...items].sort(
        (a, b) =>
          a.category.localeCompare(b.category) ||
          a.title.localeCompare(b.title),
      );
    default:
      return sortByOrder(items);
  }
}

export function sortBlogs<T extends { title: string; order?: number }>(
  items: T[],
  sortValue?: string,
  getDate?: (item: T) => string | undefined,
): T[] {
  switch (sortValue) {
    case "newest":
      return [...items].sort((a, b) => {
        const dateA = getDate?.(a) ?? "";
        const dateB = getDate?.(b) ?? "";
        return dateB.localeCompare(dateA);
      });
    case "oldest":
      return [...items].sort((a, b) => {
        const dateA = getDate?.(a) ?? "";
        const dateB = getDate?.(b) ?? "";
        return dateA.localeCompare(dateB);
      });
    case "name":
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortByOrder(items);
  }
}
