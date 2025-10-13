export const createDragPreview = (content: HTMLElement | string, e: DragEvent) => {
  const preview = document.createElement("div");
  preview.style.position = "absolute";
  preview.style.top = "-9999px";
  preview.style.left = "-9999px";
  preview.style.pointerEvents = "none";
  preview.style.zIndex = "10000";
  preview.style.background = "rgba(255, 255, 255, 0.9)";
  preview.style.padding = "8px 12px";
  preview.style.borderRadius = "6px";
  preview.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  preview.style.border = "1px solid rgba(0,0,0,0.1)";
  preview.style.maxWidth = "320px";
  preview.style.fontFamily = "inherit";

  if (typeof content === "string") {
    preview.textContent = content;
  } else {
    const clone = content.cloneNode(true) as HTMLElement;
    clone.style.margin = "0";
    clone.style.transform = "scale(0.9)";
    clone.style.transformOrigin = "top left";
    clone.style.opacity = "0.9";
    preview.appendChild(clone);
  }

  document.body.appendChild(preview);
  e.dataTransfer?.setDragImage(preview, 20, 20);
  setTimeout(() => document.body.removeChild(preview), 0);
};
