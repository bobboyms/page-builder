import { onCleanup } from "solid-js";
import { clearDropFeedbacks } from "./dropFeedback";
import { createDragPreview } from "./dragPreview";
import { setDnDStore } from "../stores/dndStore";
import type { DraggablePaletteOptions } from "../types/builder";

export const draggablePalette = (el: HTMLElement, accessor: () => DraggablePaletteOptions) => {
  const options = accessor();
  el.setAttribute("draggable", "true");

  const handleDragStart = (e: DragEvent) => {
    e.stopPropagation();
    setDnDStore("draggedData", { componentType: options.type });
    e.dataTransfer?.setData("text/plain", options.type);
    e.dataTransfer && (e.dataTransfer.effectAllowed = "copy");
    createDragPreview(el.textContent || options.type, e);
    el.classList.add("opacity-50");
  };

  const handleDragEnd = () => {
    setDnDStore("draggedData", null);
    clearDropFeedbacks();
    el.classList.remove("opacity-50");
  };

  el.addEventListener("dragstart", handleDragStart);
  el.addEventListener("dragend", handleDragEnd);

  onCleanup(() => {
    el.removeEventListener("dragstart", handleDragStart);
    el.removeEventListener("dragend", handleDragEnd);
  });
};
