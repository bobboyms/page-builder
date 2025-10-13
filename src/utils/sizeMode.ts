import type { JSX } from "solid-js";
import type { SizeModStyle } from "../types/size";

export const sizeModTypeClasses = (style: SizeModStyle): JSX.CSSProperties => {
  switch (style) {
    case "fixed":
      return { flex: "0 0 auto" };
    case "hug":
      return { flex: "0 1 auto" };
    case "fill":
      return { flex: "1 1 0", "min-width": "0" };
    default:
      return {};
  }
};
