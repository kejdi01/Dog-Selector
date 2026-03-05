import { useCallback, useMemo, useState } from "react";
import type { UUID } from "../../../types/dogs";

const useSelection = <T extends { id: UUID }>() => {
  const [selected, setSelected] = useState<Record<UUID, boolean>>({});

  const selectedIds = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => k as UUID),
    [selected],
  );

  const isChecked = useCallback((id: UUID) => !!selected[id], [selected]);

  const toggleOne = useCallback((id: UUID, value: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: value }));
  }, []);

  const clear = useCallback(() => setSelected({}), []);

  const isAllCheckedOnPage = useCallback(
    (rows: T[]) => rows.length > 0 && rows.every((r) => !!selected[r.id]),
    [selected],
  );

  const setAllOnPage = useCallback((rows: T[], value: boolean) => {
    setSelected((prev) => {
      const next = { ...prev };
      rows.forEach((r) => (next[r.id] = value));
      return next;
    });
  }, []);

  return {
    selected,
    selectedIds,
    isChecked,
    toggleOne,
    clear,
    isAllCheckedOnPage,
    setAllOnPage,
  };
};

export default useSelection;
