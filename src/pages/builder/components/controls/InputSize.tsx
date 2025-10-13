import { Component } from "solid-js";
import { SizeValue } from "../../../../types/size";

type IconComponent = Component<{ width?: number; height?: number }>;

type InputSizeProps = {
  value: SizeValue;
  onChange: (v: SizeValue) => void;
  icon: IconComponent;
};

export const InputSize: Component<InputSizeProps> = (props) => {
  return (
    <div class="flex flex-1 min-w-0 flex-row items-center gap-1 p-1 bg-ps-gray-2 border border-ps-gray-3">
      <props.icon width={18} height={18} />
      <input
        type="text"
        inputmode="numeric"
        class="small-semibold min-w-0 flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-ps-gray/70"
        value={props.value.value}
        onInput={(e) => {
          const numericValue = e.currentTarget.value.replace(/[^0-9]/g, "");
          if (numericValue !== e.currentTarget.value) {
            e.currentTarget.value = numericValue;
          }
          props.onChange({ value: numericValue, measurement: props.value.measurement });
        }}
      />

      <select
        class="min-w-0"
        value={props.value.measurement}
        onChange={(e) =>
          props.onChange({ value: props.value.value, measurement: e.currentTarget.value as SizeValue["measurement"] })
        }
      >
        <option value="px">px</option>
        <option value="%">%</option>
        <option value="vh">vh</option>
        <option value="vw">vw</option>
      </select>
    </div>
  );
};
