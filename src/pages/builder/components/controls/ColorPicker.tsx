import { Component, createSignal, Show } from "solid-js";
import { IconClosedEyes, IconOpenEyes } from "../icons";

export type ColorPickerProps = {
  color: string;
  onChange: (value: string) => void;
};

export const ColorPicker: Component<ColorPickerProps> = (props) => {
  const [open, setOpen] = createSignal(true);

  return (
    <div class="flex flex-1 h-8 min-w-0 flex-row items-center gap-1 p-1 bg-ps-gray-2 border border-ps-gray-3">
      <Show when={open()}>
        <input
          class="w-6 h-6"
          type="color"
          name="color"
          value={props.color}
          onInput={(e) => props.onChange(e.currentTarget.value)}
        />
      </Show>

      <input
        type="text"
        inputmode="numeric"
        class="small-semibold min-w-0 flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-ps-gray/70"
        value={props.color}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        disabled={!open()}
      />

      <button
        type="button"
        class="ml-auto inline-flex items-center justify-center"
        onClick={() => {
          setOpen(!open());
          if (open() === false) {
            props.onChange("transparent");
          } else {
            props.onChange("#ffffff");
          }
        }}
      >
        {open() ? (
          <IconOpenEyes width={20} height={16} />
        ) : (
          <IconClosedEyes width={20} height={16} />
        )}
      </button>
    </div>
  );
};
