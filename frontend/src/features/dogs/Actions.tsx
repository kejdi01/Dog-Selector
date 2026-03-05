import { Button, Dropdown } from "react-bootstrap";

const Actions = ({
  onEdit,
  onRemove,
}: {
  onEdit: () => void;
  onRemove: () => void;
}) => {
  return (
    <>
      <div className="d-none d-md-inline">
        <Button
          variant="link"
          className="text-danger text-decoration-none"
          onClick={onRemove}
        >
          Remove
        </Button>
        <Button
          variant="link"
          className="text-primary text-decoration-none"
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>

      <div className="d-inline d-md-none">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="text-decoration-none p-0"
            aria-label="Open actions"
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>⋮</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={onRemove}>
              Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default Actions;
