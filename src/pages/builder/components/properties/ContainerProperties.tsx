import type { Component } from "solid-js";
import { Show } from "solid-js";

import type { ContainerProps } from "../../../../types/builder";
import type { LayoutStyle } from "../../../../types/layout";
import type { SizeModStyle, SizeValue } from "../../../../types/size";
import { LayoutStyleSelector } from "../controls/LayoutStyleSelector";
import { SizeModeSelector } from "../controls/SizeModeSelector";
import { SizePicker } from "../controls/SizePicker";
import { GapPicker } from "../controls/GapPicker";
import { PaddingPicker } from "../controls/PaddingPicker";
import { ColorPicker } from "../controls/ColorPicker";
import { BorderRadiusPicker } from "../controls/BorderRadiusPicker";

export interface ContainerPropertiesProps {
  props: ContainerProps;
  onUpdate: (newProps: Partial<ContainerProps>) => void;
}

export const ContainerProperties: Component<ContainerPropertiesProps> = (props) => {
  const layoutStyle = () => props.props.layoutStyle;
  const sizeModStyle = () => props.props.sizeModStyle;
  const width = () => props.props.width;
  const height = () => props.props.height;
  const gap = () => props.props.gap;
  const bgColor = () => props.props.bgColor;

  const paddingW = () => props.props.paddingW;
  const paddingH = () => props.props.paddingH;

  const borderRadiusPicker = () => props.props.borderRadiusPicker;

  const handleLayoutChange = (value: LayoutStyle) => props.onUpdate({ layoutStyle: value });
  const handleSizeModeChange = (value: SizeModStyle) => props.onUpdate({ sizeModStyle: value });
  const handleWidthChange = (value: SizeValue) => props.onUpdate({ width: value });
  const handleHeightChange = (value: SizeValue) => props.onUpdate({ height: value });
  const handleGapChange = (value: SizeValue) => props.onUpdate({ gap: value });

  const handlePaddingWChange = (value: SizeValue) => props.onUpdate({ paddingW: value });
  const handlePaddingHChange = (value: SizeValue) => props.onUpdate({ paddingH: value });

  const handleBgColorChange = (value: string) => props.onUpdate({ bgColor: value });
  const handleBorderRadiusPickerChange = (value: SizeValue) => props.onUpdate({ borderRadiusPicker: value });

  return (
    <div class="space-y-3">
      <h6 class="p-semibold">Layout style</h6>
      <LayoutStyleSelector value={layoutStyle()} onChange={handleLayoutChange} iconSize="h-5 w-5" />
      <SizeModeSelector value={sizeModStyle()} onChange={handleSizeModeChange} />
      <Show when={sizeModStyle() === "fixed"}>
        <SizePicker
          width={width()}
          widthOnChange={handleWidthChange}
          height={height()}
          heightOnChange={handleHeightChange}
        />
      </Show>
      <GapPicker value={gap()} onChange={handleGapChange} />
      <PaddingPicker paddingW={paddingW()} paddingWOnChange={handlePaddingWChange} paddingH={paddingH()} paddingHOnChange={handlePaddingHChange} />
      <ColorPicker color={bgColor()} onChange={handleBgColorChange} />
      <BorderRadiusPicker value={borderRadiusPicker()} onChange={handleBorderRadiusPickerChange} />
    </div>
  );
};
