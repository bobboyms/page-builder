import type { JSX } from "solid-js";
import type { LayoutStyle } from "../types/layout";

export const layoutClasses = (style: LayoutStyle): JSX.CSSProperties => {
  switch (style) {
    case "split-vertical":
      return { display: "flex", "flex-direction": "row" };
    case "split-horizontal":
      return { display: "flex", "flex-direction": "column" };
    case "grid":
      return { display: "grid" };
    default:
      return {};
  }
};
