import type { LayoutKind } from "../stores/bitboardStore";

export function getArrayFromLayout(layout: LayoutKind) {
  if (layout === "LTR_ASC") {
    return Array.from({ length: 64 }, (_, index) => index);
  } else if (layout === "LTR_DESC") {
    return Array.from({ length: 64 }, (_, index) => 63 - index);
  } else if (layout === "RTL_ASC") {
    return Array.from(
      { length: 64 },
      (_, index) => 7 - (index % 8) + Math.floor(index / 8) * 8,
    );
  } else if (layout === "RTL_DESC") {
    return Array.from(
      { length: 64 },
      (_, index) => (index % 8) + (7 - Math.floor(index / 8)) * 8,
    );
  } else return [];
}

export function getTableFromLayout(layout: LayoutKind) {
  const array = getArrayFromLayout(layout);
  const table: number[][] = [];

  for (let i = 0; i < 8; i++) {
    table.push(array.slice(i * 8, (i + 1) * 8));
  }

  return table;
}
