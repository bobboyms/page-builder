import type { Component, JSX } from "solid-js";
import { SizeModStyle } from "../../../../types/size";
import { IconFill, IconFixed, IconHug } from "../icons";


const base = "inline-flex items-center justify-center p-2 text-sm select-none";
const off = "text-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30";
const on = "bg-white/10 text-white ring-1 ring-white/20";

export interface SizeModeSelectorProps {
  value: SizeModStyle;
  onChange: (value: SizeModStyle) => void;
}

export const SizeModeSelector: Component<SizeModeSelectorProps> = (props) => {
  const Button = (buttonProps: { value: SizeModStyle; label: string; icon: JSX.Element }) => (
    <button
      type="button"
      role="radio"
      aria-checked={props.value === buttonProps.value}
      onClick={() => props.onChange(buttonProps.value)}
      class={`${base} ${props.value === buttonProps.value ? on : off} flex-1 basis-0 min-w-0`}
    >
      <span class="shrink-0 grid place-items-center w-5 h-5">{buttonProps.icon}</span>
      <span class="small-semibold">{buttonProps.label}</span>
    </button>
  );

  return (
    <div class="space-y-2 w-full max-w-full">
      <div role="radiogroup" aria-label="Size mode" class="gap-1 w-full max-w-full min-w-0 overflow-hidden inline-flex items-stretch bg-white/5 p-2">
        <Button value="fixed" label="Fixed" icon={<IconFixed width={16} height={16} />} />
        <Button value="hug" label="Hug" icon={<IconHug width={16} height={16} />} />
        <Button value="fill" label="Fill" icon={<IconFill width={16} height={16} />} />
      </div>
    </div>
  );
};
