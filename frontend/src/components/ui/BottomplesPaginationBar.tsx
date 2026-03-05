import Pagination from "react-bootstrap/Pagination";

const ButtonlessPagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <>
      <Pagination className="mb-0">
        <Pagination.Prev disabled={prevDisabled} onClick={onPrev} />
      </Pagination>

      <span className="text-muted small">
        Page {page} of {totalPages}
      </span>

      <Pagination className="mb-0">
        <Pagination.Next disabled={nextDisabled} onClick={onNext} />
      </Pagination>
    </>
  );
};

export default ButtonlessPagination;
