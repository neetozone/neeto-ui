import i18next from "i18next";

export const getDropdownPlacement = placement => {
  if (typeof placement !== "string") return placement;

  if (i18next.dir() !== "rtl") return placement;

  if (placement.endsWith("-start")) return placement.replace(/-start$/, "-end");

  if (placement.endsWith("-end")) return placement.replace(/-end$/, "-start");

  return placement;
};
