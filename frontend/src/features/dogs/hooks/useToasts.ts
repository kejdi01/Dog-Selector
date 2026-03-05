import { useCallback, useState } from "react";
import type { AppToast } from "../../../components/ui/ToastHost";
import { makeId } from "../../../utils/utils";

export const useToasts = () => {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  const pushToast = useCallback(
    (variant: "success" | "danger", message: string) => {
      setToasts((prev) => [...prev, { id: makeId(), variant, message }]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, pushToast, removeToast };
};

export default useToasts;
