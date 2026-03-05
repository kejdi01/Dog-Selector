import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ConfirmModal from "../components/ui/ConfirmModal";
import PaginationBar from "../components/ui/PaginationBar";
import SearchBar from "../components/ui/SearchBar";
import ToastHost from "../components/ui/ToastHost";
import type { Breed, Description, Dog, UUID } from "../types/dogs";
import EditDogOffcanvas from "../features/dogs/EditDogOffcanvas";
import { bulkDeleteDogs, deleteDog, updateDog } from "../features/dogs/service";
import { useToasts } from "../features/dogs/hooks/useToasts";
import DogsTable from "../features/dogs/DogTable";
import useDogsQuery from "../features/dogs/hooks/useDogsQuery";
import useSelection from "../features/dogs/hooks/useSelection";

type ConfirmState =
  | null
  | { mode: "single"; id: UUID }
  | { mode: "bulk"; ids: UUID[] };

type DogUpdatePayload = Partial<Pick<Dog, "status" | "rating" | "note">> & {
  breed?: Breed;
  description?: Description;
};

const DogsPage = () => {
  const {
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
  } = useDogsQuery();

  const {
    selectedIds,
    isChecked,
    toggleOne,
    clear: clearSelection,
    isAllCheckedOnPage,
    setAllOnPage,
  } = useSelection<Dog>();

  const { toasts, pushToast, removeToast } = useToasts();

  const [editing, setEditing] = useState<Dog | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [deleting, setDeleting] = useState(false);

  const allChecked = useMemo(
    () => isAllCheckedOnPage(rows),
    [isAllCheckedOnPage, rows],
  );

  useEffect(() => {
    clearSelection();
  }, [query.search, query.ordering, query.page_size, clearSelection]);

  const onInlineRating = useCallback(
    async (dog: Dog, rating: number) => {
      const prevRating = dog.rating;

      setRows((prev) =>
        prev.map((r) => (r.id === dog.id ? { ...r, rating } : r)),
      );

      try {
        await updateDog(dog.id, { rating });
        pushToast("success", "Changes were saved");
      } catch {
        setRows((prev) =>
          prev.map((r) => (r.id === dog.id ? { ...r, rating: prevRating } : r)),
        );
        pushToast("danger", "Failed to update rating");
      }
    },
    [pushToast, setRows],
  );

  const onSaveEdit = useCallback(
    async (dogId: UUID, payload: DogUpdatePayload) => {
      setSavingEdit(true);
      try {
        await updateDog(dogId, payload);
        pushToast("success", "Changes were saved");
        setEditing(null);
        await reload();
      } catch {
        pushToast("danger", "Failed to save changes");
      } finally {
        setSavingEdit(false);
      }
    },
    [pushToast, reload],
  );

  const onConfirmDelete = useCallback(async () => {
    if (!confirm) return;

    setDeleting(true);
    try {
      if (confirm.mode === "single") {
        await deleteDog(confirm.id);
      } else {
        await bulkDeleteDogs(confirm.ids);
        clearSelection();
      }
      pushToast("danger", "Option was removed");
      setConfirm(null);
      await reload();
    } catch {
      pushToast("danger", "Failed to remove");
    } finally {
      setDeleting(false);
    }
  }, [confirm, pushToast, reload, clearSelection]);

  return (
    <>
      <div className="py-4 mb-3 d-flex align-items-center justify-content-between gap-2 flex-nowrap">
        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={() => {
              submitSearch();
            }}
          />
        </div>

        {selectedIds.length > 0 && (
          <Button
            variant="danger"
            className="flex-shrink-0"
            disabled={deleting}
            onClick={() => setConfirm({ mode: "bulk", ids: selectedIds })}
          >
            Remove selected
          </Button>
        )}
      </div>

      <Card className="shadow-sm">
        <Card.Body className="px-0">
          <DogsTable
            loading={loading}
            rows={rows}
            ordering={ordering}
            onToggleSort={toggleSort}
            isAllCheckedOnPage={allChecked}
            onToggleAllOnPage={(value) => setAllOnPage(rows, value)}
            isChecked={isChecked}
            onToggleOne={toggleOne}
            onInlineRating={onInlineRating}
            onEdit={setEditing}
            onRemove={(id) => setConfirm({ mode: "single", id })}
          />

          <div className="mt-3 px-3">
            <PaginationBar
              count={count}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPage(1);
                setPageSize(size);
              }}
            />
          </div>
        </Card.Body>
      </Card>

      <EditDogOffcanvas
        show={!!editing}
        dog={editing}
        onClose={() => setEditing(null)}
        onSave={onSaveEdit}
        saving={savingEdit}
      />

      <ConfirmModal
        show={!!confirm}
        title="You are about to remove this option."
        body="Once you remove this option the action is irreversible. Do you want to continue?"
        confirmText="Remove"
        confirmVariant="danger"
        onCancel={() => setConfirm(null)}
        onConfirm={onConfirmDelete}
        loading={deleting}
      />

      <ToastHost toasts={toasts} onClose={removeToast} />
    </>
  );
};

export default DogsPage;
