import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Props = {
  show: boolean;
  title: string;
  body: string;
  confirmText?: string;
  confirmVariant?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const ConfirmModal = ({
  show,
  title,
  body,
  confirmText = "Confirm",
  confirmVariant = "danger",
  onCancel,
  onConfirm,
  loading,
}: Props) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: 700 }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} disabled={loading}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
