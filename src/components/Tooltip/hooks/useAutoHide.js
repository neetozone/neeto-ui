import { useEffect } from "react";

const useAutoHide = (context, { enabled, delay }) => {
  const { open, onOpenChange } = context;
  const isEnabled = enabled && open && delay > 0;

  useEffect(() => {
    if (!isEnabled) return undefined;

    const timeout = setTimeout(() => {
      onOpenChange(false);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [isEnabled, delay]);
};

export default useAutoHide;
