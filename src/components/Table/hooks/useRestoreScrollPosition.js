import { useEffect } from "react";

import { assocPath, prop } from "ramda";
import { create } from "zustand";

import useFuncDebounce from "hooks/useFuncDebounce";

export const useScrollStore = create(set => ({
  scrollPositions: {},
  setScrollPosition: (key, position) =>
    set(assocPath(["scrollPositions", key], position)),
}));

export const useRestoreScrollPosition = ({ tableRef, scrollRef, loading }) => {
  const key = window.location.pathname;
  const scrollPositions = useScrollStore(prop("scrollPositions"));
  const setScrollPosition = useScrollStore(prop("setScrollPosition"));

  useEffect(() => {
    if (loading) {
      setScrollPosition(key, 0);

      return;
    }

    if (scrollRef.current === null || !scrollPositions[key]) return;

    setTimeout(() => {
      const position = scrollPositions[key];
      scrollRef.current?.scrollTo({ top: position });
    });
  }, [key, tableRef, loading]);

  const handleScroll = useFuncDebounce(event => {
    setScrollPosition(key, parseInt(event.target.scrollTop));
  });

  return { handleScroll };
};
