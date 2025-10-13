import type { JSX } from "solid-js";
import { LayoutStyle } from "../../../../types/layout";
import { IconGrid, IconSplitHorizontal, IconSplitVertical } from "../icons";

type Option = {
  id: LayoutStyle;
  label: string;
  icon: (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;
};

const OPTIONS: Option[] = [
  { id: "split-vertical", label: "Lado a lado", icon: IconSplitVertical },
  { id: "split-horizontal", label: "Empilhado", icon: IconSplitHorizontal },
  { id: "grid", label: "Grade", icon: IconGrid },
];

export type LayoutStyleSelectorProps = {
  value: LayoutStyle;
  onChange: (value: LayoutStyle) => void;
  class?: string;
  label?: string;
  iconSize?: string;
};

export function LayoutStyleSelector(props: LayoutStyleSelectorProps) {
  return (
    <div
      class={`w-full bg-ps-gray-2 p-2 border-amber-800 text-zinc-300 ${props.class ?? ""}`}
      role="group"
      aria-label={props.label ?? "Layout style"}
    >
      <div class="mx-auto grid max-w-3xl grid-cols-3">
        {OPTIONS.map((opt) => {
          const isSelected = props.value === opt.id;
          const Icon = opt.icon;
          return (
            <button
              type="button"
              aria-pressed={isSelected}
              aria-label={opt.label}
              onClick={() => props.onChange?.(opt.id)}
              class={`relative h-8 border-0 rounded-none transition focus-visible:outline-none ${isSelected
                ? "border-ps-gray bg-ps-black-1 ring-1 ring-ps-gray"
                : "border-transparent bg-zinc-800/20 hover:bg-zinc-800/40 focus-visible:ring-1 focus-visible:ring-ps-gray"
                }`}
            >
              <div class="absolute inset-0 grid place-items-center">
                <Icon class={`${props.iconSize ?? "h-7 w-7"} ${isSelected ? "text-ps-white" : "text-ps-gray"}`} />
              </div>
              <span class="sr-only">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
