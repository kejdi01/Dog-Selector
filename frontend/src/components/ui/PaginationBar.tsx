import { useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import ButtonlessPagination from "./BottomplesPaginationBar";
import { buildPages } from "../../utils/utils";

const PaginationBar = ({
  count,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: {
  count: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange?: (size: number) => void;
}) => {
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);

  const [goTo, setGoTo] = useState("");

  const commitGoTo = () => {
    const n = Number(goTo);
    if (!Number.isFinite(n)) return;
    const clamped = Math.max(1, Math.min(totalPages, Math.trunc(n)));
    onPageChange(clamped);
    setGoTo("");
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 w-100">
      <div className="text-muted flex-shrink-0">Total {count} items</div>

      <div className="d-flex align-items-center flex-wrap gap-3">
        <div className="d-none d-sm-flex align-items-center flex-shrink-0">
          <Pagination className="mb-0 flex-nowrap">
            <Pagination.Prev
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            />

            {pages.map((it, idx) => {
              if (it === "ellipsis")
                return <Pagination.Ellipsis key={`e-${idx}`} disabled />;

              return (
                <Pagination.Item
                  key={it}
                  active={it === page}
                  onClick={() => onPageChange(it)}
                >
                  {it}
                </Pagination.Item>
              );
            })}

            <Pagination.Next
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            />
          </Pagination>
        </div>

        <div className="d-flex d-sm-none align-items-center">
          <ButtonlessPagination
            page={page}
            totalPages={totalPages}
            onPrev={() => onPageChange(page - 1)}
            onNext={() => onPageChange(page + 1)}
          />
        </div>

        <Form.Select
          size="sm"
          className="w-auto flex-shrink-0"
          value={pageSize}
          onChange={(e) => {
            const next = Number(e.target.value);
            onPageSizeChange?.(next);
          }}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </Form.Select>

        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <span className="text-muted">Go to</span>
          <Form.Control
            size="sm"
            className="w-auto"
            inputMode="numeric"
            min={1}
            value={goTo}
            onChange={(e) => setGoTo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitGoTo();
            }}
            onBlur={commitGoTo}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
