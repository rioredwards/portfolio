import { sortByOrder } from "@/lib/content";

export interface SortOption {
  label: string;
  value: string;
}

export const WORK_SORT_OPTIONS: SortOption[] = [
  { label: "Most Recent", value: "recent" },
  { label: "Oldest First", value: "oldest" },
  { label: "A-Z", value: "name_asc" },
  { label: "Z-A", value: "name_desc" },
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
    case "oldest":
      return sortByOrder(items);
    case "name_asc":
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    case "name_desc":
      return [...items].sort((a, b) => b.title.localeCompare(a.title));
    case "recent":
    default:
      return sortByOrder(items).reverse();
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
