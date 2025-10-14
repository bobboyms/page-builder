import type { Component, JSX } from "solid-js";
import { IconBracketsDivider, IconRound } from "../icons";
import { InputSize } from "./InputSize";
import { SizeValue } from "../../../../types/size";



type RoundPickerProps = {
  value: SizeValue;
  onChange: (v: SizeValue) => void;
};

export const BorderRadiusPicker: Component<RoundPickerProps> = (props) => (
  <div class="flex flex-row gap-2 w-full min-w-0 overflow-hidden">
    {/* <InputGap value={props.value} onChange={props.onChange} /> */}
    <InputSize value={props.value} onChange={props.onChange} icon={IconRound} />
  </div>
);
