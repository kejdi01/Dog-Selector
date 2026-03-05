import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Search } from "react-bootstrap-icons";

const SearchBar = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) => {
  return (
    <InputGroup style={{ maxWidth: 360 }}>
      <Form.Control
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
      />
      <Button variant="primary" onClick={onSubmit}>
        <Search />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
