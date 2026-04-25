export type QueryValue = string | number | null | undefined;

export function buildQueryHref(
  basePath: string,
  params: Record<string, QueryValue>,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function readSingleParam(rawValue: string | string[] | undefined) {
  return Array.isArray(rawValue) ? rawValue[0] : rawValue;
}
