import { create } from "zustand";

export const useTableStore = create(set => ({
  infoPaneState: { isOpen: false, column: null },
  setInfoPaneState: state => set({ infoPaneState: state }),
}));
