import { Component } from "solid-js";
import { SizeValue } from "../../../../types/size";
import { IconH, IconW } from "../icons";
import { InputSize } from "./InputSize";

export type SizePickerProps = {
  width: SizeValue;
  widthOnChange: (v: SizeValue) => void;
  height: SizeValue;
  heightOnChange: (v: SizeValue) => void;
};

export const SizePicker: Component<SizePickerProps> = (props) => {
  return (
    <div class="flex flex-row gap-2 w-full min-w-0 overflow-hidden">
      <InputSize value={props.width} onChange={props.widthOnChange} icon={IconW} />
      <InputSize value={props.height} onChange={props.heightOnChange} icon={IconH} />
    </div>
  );
};
