import type { Component } from "solid-js";
import { draggablePalette } from "../../../../directives";
import type { ComponentType } from "../../../../types/builder";

export interface PaletteItemProps {
  type: ComponentType;
  label: string;
}

export const PaletteItem: Component<PaletteItemProps> = (props) => (
  <div
    use:draggablePalette={{ type: props.type }}
    class="p-2 border rounded bg-gray-100 text-center text-black cursor-grab active:cursor-grabbing"
  >
    {props.label}
  </div>
);
