import { onCleanup } from "solid-js";
import { clearDropFeedbacks } from "./dropFeedback";
import { createDragPreview } from "./dragPreview";
import { setDnDStore } from "../stores/dndStore";
import type { DraggableNodeOptions } from "../types/builder";

export const draggableNode = (el: HTMLElement, accessor: () => DraggableNodeOptions) => {
  const options = accessor();
  el.setAttribute("draggable", "true");

  const handleDragStart = (e: DragEvent) => {
    e.stopPropagation();
    setDnDStore("draggedData", { sourceId: options.id });
    e.dataTransfer?.setData("text/plain", options.id);
    e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
    createDragPreview(options.previewElement(), e);
    options.previewElement().classList.add("opacity-50");
  };

  const handleDragEnd = () => {
    setDnDStore("draggedData", null);
    clearDropFeedbacks();
    options.previewElement().classList.remove("opacity-50");
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  el.addEventListener("mousedown", handleMouseDown);
  el.addEventListener("dragstart", handleDragStart);
  el.addEventListener("dragend", handleDragEnd);

  onCleanup(() => {
    el.removeEventListener("mousedown", handleMouseDown);
    el.removeEventListener("dragstart", handleDragStart);
    el.removeEventListener("dragend", handleDragEnd);
  });
};
