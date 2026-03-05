import type { DogsListParams } from "../features/dogs/service";

// utils/utils.ts
export function buildPages(
  current: number,
  total: number,
  siblings: number = 2,
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const add = (p: number | "ellipsis") => pages.push(p);

  if (total <= 1) return [1];

  const maxVisible = 2 * siblings + 5;
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) add(i);
    return pages;
  }

  add(1);

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  if (left > 2) add("ellipsis");

  for (let p = left; p <= right; p++) add(p);

  if (right < total - 1) add("ellipsis");

  add(total);

  return pages;
}

export const makeId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const normalizeListParams = (params: DogsListParams): DogsListParams => {
  const search = params.search?.trim();
  return {
    ...params,
    search: search ? search : undefined,
  };
};
