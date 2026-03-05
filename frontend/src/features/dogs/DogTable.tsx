import { Form, Spinner, Table } from "react-bootstrap";
import SortHeader from "../../components/ui/SortHeader";
import type { Dog, UUID } from "../../types/dogs";
import DogRow from "./DogTableRow";

export type SortKey =
  | "status"
  | "breed__name"
  | "description__title"
  | "rating"
  | "note";

type Column = {
  key: SortKey;
  label: string;
  hideClassName?: string;
};

const COLUMNS: Column[] = [
  { key: "status", label: "Status" },
  { key: "breed__name", label: "Breed" },
  { key: "description__title", label: "Description" },
  { key: "rating", label: "Rating" },
  { key: "note", label: "Note", hideClassName: "d-none d-lg-table-cell" },
];

type Props = {
  loading: boolean;
  rows: Dog[];
  ordering: string;
  onToggleSort: (key: SortKey) => void;

  isAllCheckedOnPage: boolean;
  onToggleAllOnPage: (value: boolean) => void;

  isChecked: (id: UUID) => boolean;
  onToggleOne: (id: UUID, value: boolean) => void;

  onInlineRating: (dog: Dog, rating: number) => void;
  onEdit: (dog: Dog) => void;
  onRemove: (id: UUID) => void;
};

const DogsTable = ({
  loading,
  rows,
  ordering,
  onToggleSort,
  isAllCheckedOnPage,
  onToggleAllOnPage,
  isChecked,
  onToggleOne,
  onInlineRating,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0 table-sm table-md">
        <thead>
          <tr>
            <th className="ps-3" style={{ width: 40 }}>
              <Form.Check
                aria-label="Select all on page"
                checked={isAllCheckedOnPage}
                onChange={(e) => onToggleAllOnPage(e.target.checked)}
              />
            </th>

            {COLUMNS.map((c) => (
              <th key={c.key} className={c.hideClassName}>
                <SortHeader
                  label={c.label}
                  column={c.key}
                  ordering={ordering}
                  onSort={onToggleSort}
                />
              </th>
            ))}

            <th className="text-end pe-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={COLUMNS.length + 2} className="py-5 text-center">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            rows.map((dog) => (
              <DogRow
                key={dog.id}
                dog={dog}
                checked={isChecked(dog.id)}
                onCheckedChange={(v) => onToggleOne(dog.id, v)}
                onInlineRating={onInlineRating}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DogsTable;
