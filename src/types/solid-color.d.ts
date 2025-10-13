import type { Component, JSX } from "solid-js";
import type { ColorResult } from "solid-color";

interface ColorPickerProviderProps {
  color?: unknown;
  defaultColor?: unknown;
  onChange?: (color: ColorResult, event?: Event) => void;
  onChangeComplete?: (color: ColorResult, event?: Event) => void;
  onSwatchHover?: (color: ColorResult, event?: Event) => void;
  children?: JSX.Element;
}

declare module "solid-color/dist/source/components/_common" {
  export const ColorPickerProvider: Component<ColorPickerProviderProps>;
}
