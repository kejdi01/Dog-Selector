import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchDogs } from "../service";
import type { Dog } from "../../../types/dogs";

type SortKey =
  | "status"
  | "breed__name"
  | "description__title"
  | "rating"
  | "note";

type Query = {
  page: number;
  page_size: number;
  search: string;
  ordering: string;
};

const useDogsQuery = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Dog[]>([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [ordering, setOrdering] = useState<string>("status");

  const query: Query = useMemo(
    () => ({ page, page_size: pageSize, search, ordering }),
    [page, pageSize, search, ordering],
  );

  const toggleSort = useCallback((key: SortKey) => {
    setPage(1);
    setOrdering((prev) => {
      if (prev === key) return `-${key}`;
      if (prev === `-${key}`) return key;
      return key;
    });
  }, []);

  const submitSearch = useCallback(() => {
    setPage(1);
    setSearch(searchInput.trim());
  }, [searchInput]);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDogs(query);
      setRows(data.results);
      setCount(data.count);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const data = await fetchDogs(query);
        if (!alive) return;
        setRows(data.results);
        setCount(data.count);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [query]);

  return {
    loading,
    rows,
    setRows,
    count,
    page,
    setPage,
    pageSize,
    setPageSize,
    searchInput,
    setSearchInput,
    submitSearch,
    ordering,
    toggleSort,
    reload,
    query,
  };
};

export default useDogsQuery;
