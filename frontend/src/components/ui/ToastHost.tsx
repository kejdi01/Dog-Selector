import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export type AppToast = {
  id: string;
  variant: "success" | "danger";
  message: string;
};

const ToastHost = ({
  toasts,
  onClose,
}: {
  toasts: AppToast[];
  onClose: (id: string) => void;
}) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          onClose={() => onClose(t.id)}
          delay={3000}
          autohide
          bg={t.variant}
        >
          <Toast.Body style={{ color: "white", fontWeight: 600 }}>
            {t.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ToastHost;
