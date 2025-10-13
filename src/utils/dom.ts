export const getScrollableParent = (el: HTMLElement): HTMLElement => {
  let parent = el.parentElement;
  while (parent) {
    const computedStyle = window.getComputedStyle(parent);
    if (
      computedStyle.overflowY === "auto" ||
      computedStyle.overflowY === "scroll" ||
      computedStyle.overflowX === "auto" ||
      computedStyle.overflowX === "scroll"
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
};
