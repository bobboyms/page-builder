import { dndStore, setDnDStore } from "../stores/dndStore";
import type { DropPosition } from "../types/builder";

let dropOverlay: HTMLDivElement | null = null;
let overlayRaf = 0;
let clearTimer: number | null = null;
let lastInsideEl: HTMLElement | null = null;

const highlightClasses = ["ring-2", "ring-green-400", "ring-offset-2"];

const ensureDropOverlay = () => {
  if (!dropOverlay) {
    dropOverlay = document.createElement("div");
    dropOverlay.className = "pointer-events-none";
    Object.assign(dropOverlay.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "0px",
      height: "4px",
      background: "#3b82f6",
      borderRadius: "9999px",
      opacity: "0",
      transform: "translate3d(0,0,0)",
      transition: "opacity 80ms linear, transform 80ms ease",
      zIndex: "9999",
      boxShadow: "0 0 0 1px rgba(59,130,246,0.6), 0 2px 8px rgba(0,0,0,0.15)",
    } satisfies Partial<CSSStyleDeclaration>);
    document.body.appendChild(dropOverlay);
  }
  return dropOverlay;
};

const addInsideHighlight = (el: HTMLElement) => {
  el.classList.add(...highlightClasses);
};

const removeInsideHighlight = (el: HTMLElement) => {
  el.classList.remove(...highlightClasses);
};

export const showDropOverlay = (targetEl: HTMLElement, pos: DropPosition) => {
  const el = ensureDropOverlay();
  const rect = targetEl.getBoundingClientRect();
  const y = pos === "before" ? rect.top - 2 : pos === "after" ? rect.bottom - 2 : rect.top;
  const x = rect.left;
  const w = rect.width;
  if (overlayRaf) cancelAnimationFrame(overlayRaf);
  overlayRaf = requestAnimationFrame(() => {
    if (!dropOverlay) return;
    dropOverlay.style.width = `${w}px`;
    dropOverlay.style.height = pos === "inside" ? "0px" : "4px";
    dropOverlay.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    dropOverlay.style.opacity = pos === "inside" ? "0" : "1";
  });
};

export const hideDropOverlay = () => {
  if (dropOverlay) dropOverlay.style.opacity = "0";
};

export const setInsideHighlight = (el: HTMLElement) => {
  if (lastInsideEl && lastInsideEl !== el) {
    removeInsideHighlight(lastInsideEl);
  }
  addInsideHighlight(el);
  lastInsideEl = el;
};

export const clearInsideHighlight = (el?: HTMLElement) => {
  const target = el ?? lastInsideEl;
  if (target) {
    removeInsideHighlight(target);
    if (!el || target === lastInsideEl) {
      lastInsideEl = null;
    }
  }
};

export const scheduleClearFeedback = (callback: () => void) => {
  if (clearTimer) window.clearTimeout(clearTimer);
  clearTimer = window.setTimeout(callback, 50);
};

export const cancelClearFeedback = () => {
  if (clearTimer) {
    window.clearTimeout(clearTimer);
    clearTimer = null;
  }
};

export const clearDropFeedbacks = (currentTargetEl?: HTMLElement) => {
  hideDropOverlay();
  if (currentTargetEl && dndStore.lastPos === "inside") {
    clearInsideHighlight(currentTargetEl);
  } else {
    clearInsideHighlight();
  }
  setDnDStore({ lastTargetId: null, lastPos: null });
};
