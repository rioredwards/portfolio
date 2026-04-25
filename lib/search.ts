export function searchProjects<
  T extends {
    title: string;
    description: string;
    category: string;
    skills: string[];
  },
>(items: T[], query?: string): T[] {
  const normalized = query?.toLowerCase().trim();
  if (!normalized) return items;

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      item.category.toLowerCase().includes(normalized) ||
      item.skills.some((s) => s.toLowerCase().includes(normalized)),
  );
}

export function searchBlogs<T extends { title: string; description: string }>(
  items: T[],
  query?: string,
  getTags?: (item: T) => string[],
): T[] {
  const normalized = query?.toLowerCase().trim();
  if (!normalized) return items;

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized) ||
      (getTags?.(item) ?? []).some((t) => t.toLowerCase().includes(normalized)),
  );
}
