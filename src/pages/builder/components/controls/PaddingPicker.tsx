import type { Component, JSX } from "solid-js";
import { IconBracketsDivider, IconPaddingH, IconPaddingW } from "../icons";
import { InputSize } from "./InputSize";
import { SizeValue } from "../../../../types/size";



export type PaddingPickerProps = {
  paddingW: SizeValue;
  paddingWOnChange: (v: SizeValue) => void;
  paddingH: SizeValue;
  paddingHOnChange: (v: SizeValue) => void;
};

export const PaddingPicker: Component<PaddingPickerProps> = (props) => (
  <div class="flex flex-row gap-2 w-full min-w-0 overflow-hidden">
    <InputSize value={props.paddingW} onChange={props.paddingWOnChange} icon={IconPaddingW} />
    <InputSize value={props.paddingH} onChange={props.paddingHOnChange} icon={IconPaddingH} />
  </div>
);
