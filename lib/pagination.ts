export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export function parsePageParam(
  rawPage: string | string[] | undefined,
  totalPages: number,
) {
  const value = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  const parsed = Number.parseInt(value ?? "1", 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.min(parsed, Math.max(1, totalPages));
}

export function paginateItems<T>(
  allItems: T[],
  currentPage: number,
  pageSize: number,
): PaginationResult<T> {
  const totalItems = allItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    items: allItems.slice(startIndex, endIndex),
    currentPage: safeCurrentPage,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
  };
}
