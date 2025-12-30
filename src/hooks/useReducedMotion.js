import { useState, useEffect } from "react";

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Ensure state is synced on mount
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = e => setPrefersReducedMotion(e.matches);

    // Use a unified approach for event listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    // Legacy fallback
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
