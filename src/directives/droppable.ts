import { onCleanup } from "solid-js";
import { dndStore, setDnDStore } from "../stores/dndStore";
import type { DroppableOptions, DropPosition } from "../types/builder";
import { getScrollableParent } from "../utils/dom";
import {
  cancelClearFeedback,
  clearDropFeedbacks,
  clearInsideHighlight,
  hideDropOverlay,
  scheduleClearFeedback,
  setInsideHighlight,
  showDropOverlay,
} from "./dropFeedback";

export const droppable = (el: HTMLElement, accessor: () => DroppableOptions) => {
  const options = accessor();
  let currentPosition: DropPosition | null = null;
  const scrollContainer = getScrollableParent(el);
  let scrollRafId = 0;
  let scrollX = 0;
  let scrollY = 0;
  let dragEnterCounter = 0;

  const scrollLoop = () => {
    if (scrollX !== 0 || scrollY !== 0) {
      scrollContainer.scrollBy(scrollX, scrollY);
    }
    scrollRafId = requestAnimationFrame(scrollLoop);
  };

  const stopScrolling = () => {
    if (scrollRafId) {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = 0;
    }
    scrollX = 0;
    scrollY = 0;
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragEnterCounter += 1;
    cancelClearFeedback();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cancelClearFeedback();

    const draggedData = dndStore.draggedData;
    if (!draggedData || (draggedData.sourceId && draggedData.sourceId === options.id)) return;

    const rect = el.getBoundingClientRect();
    const offset = e.clientY - rect.top;
    const topZoneEnd = rect.height * 0.4;
    const bottomZoneStart = rect.height * 0.6;
    let newPos: DropPosition =
      offset < topZoneEnd ? "before" : offset > bottomZoneStart ? "after" : "inside";
    if (newPos === "inside" && !options.acceptInside) newPos = "after";

    if (dndStore.lastTargetId !== options.id || dndStore.lastPos !== newPos) {
      if (newPos === "inside") {
        setInsideHighlight(el);
        hideDropOverlay();
      } else {
        clearInsideHighlight(el);
        showDropOverlay(el, newPos);
      }
      setDnDStore({ lastTargetId: options.id, lastPos: newPos });
    }
    currentPosition = newPos;

    const SCROLL_ZONE = 64;
    const MAX_SCROLL_SPEED = 25;
    const containerRect = scrollContainer.getBoundingClientRect();
    if (e.clientY < containerRect.top + SCROLL_ZONE) {
      const distance = containerRect.top + SCROLL_ZONE - e.clientY;
      scrollY = -Math.min(MAX_SCROLL_SPEED, MAX_SCROLL_SPEED * (distance / SCROLL_ZONE));
    } else if (e.clientY > containerRect.bottom - SCROLL_ZONE) {
      const distance = e.clientY - (containerRect.bottom - SCROLL_ZONE);
      scrollY = Math.min(MAX_SCROLL_SPEED, MAX_SCROLL_SPEED * (distance / SCROLL_ZONE));
    } else {
      scrollY = 0;
    }

    if (e.clientX < containerRect.left + SCROLL_ZONE) {
      const distance = containerRect.left + SCROLL_ZONE - e.clientX;
      scrollX = -Math.min(MAX_SCROLL_SPEED, MAX_SCROLL_SPEED * (distance / SCROLL_ZONE));
    } else if (e.clientX > containerRect.right - SCROLL_ZONE) {
      const distance = e.clientX - (containerRect.right - SCROLL_ZONE);
      scrollX = Math.min(MAX_SCROLL_SPEED, MAX_SCROLL_SPEED * (distance / SCROLL_ZONE));
    } else {
      scrollX = 0;
    }

    if ((scrollX !== 0 || scrollY !== 0) && !scrollRafId) {
      scrollLoop();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragEnterCounter = 0;
    cancelClearFeedback();
    stopScrolling();
    if (dndStore.draggedData && currentPosition) {
      options.onDrop(dndStore.draggedData, options.id, currentPosition);
    }
    clearDropFeedbacks(el);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragEnterCounter -= 1;
    if (dragEnterCounter <= 0) {
      scheduleClearFeedback(() => {
        clearDropFeedbacks(el);
        stopScrolling();
      });
    }
  };

  el.addEventListener("dragenter", handleDragEnter);
  el.addEventListener("dragover", handleDragOver);
  el.addEventListener("drop", handleDrop);
  el.addEventListener("dragleave", handleDragLeave);

  onCleanup(() => {
    el.removeEventListener("dragenter", handleDragEnter);
    el.removeEventListener("dragover", handleDragOver);
    el.removeEventListener("drop", handleDrop);
    el.removeEventListener("dragleave", handleDragLeave);
    stopScrolling();
  });
};
