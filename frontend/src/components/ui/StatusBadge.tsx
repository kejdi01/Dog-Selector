import Badge from "react-bootstrap/Badge";
import type { DogStatus } from "../../types/dogs";

const StatusBadge = ({ status }: { status: DogStatus }) => {
  if (status === "ACCEPTED") return <Badge bg="success">Accepted</Badge>;
  if (status === "REJECTED") return <Badge bg="secondary">Rejected</Badge>;
  return (
    <Badge bg="warning" text="dark">
      Pending
    </Badge>
  );
};

export default StatusBadge;
