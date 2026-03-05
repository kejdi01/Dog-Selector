import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";

type Props<TColumn extends string> = {
  label: string;
  column: TColumn;
  ordering: string;
  onSort: (column: TColumn) => void;
};

const SortHeader = <TColumn extends string>({
  label,
  column,
  ordering,
  onSort,
}: Props<TColumn>) => {
  const isAsc = ordering === column;
  const isDesc = ordering === `-${column}`;

  return (
    <span
      onClick={() => onSort(column)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {label}

      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <CaretUpFill color={isAsc ? "#212529" : "#ced4da"} size={10} />
        <CaretDownFill color={isDesc ? "#212529" : "#ced4da"} size={10} />
      </span>
    </span>
  );
};

export default SortHeader;
