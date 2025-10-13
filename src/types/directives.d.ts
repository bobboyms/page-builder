import type { DraggableNodeOptions, DraggablePaletteOptions, DroppableOptions } from "./builder";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggableNode: DraggableNodeOptions;
      draggablePalette: DraggablePaletteOptions;
      droppable: DroppableOptions;
    }
  }
}
