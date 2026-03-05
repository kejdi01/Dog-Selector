import type { DogsListParams } from "../features/dogs/service";

export const buildPages = (current: number, total: number) => {
  const pages: (number | "ellipsis")[] = [];

  const add = (p: number | "ellipsis") => pages.push(p);

  if (total <= 9) {
    for (let i = 1; i <= total; i++) add(i);
    return pages;
  }

  add(1);

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) add("ellipsis");

  for (let p = left; p <= right; p++) add(p);

  if (right < total - 1) add("ellipsis");

  add(total);

  return pages;
};

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
