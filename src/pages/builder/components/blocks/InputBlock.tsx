import type { Component } from "solid-js";
import type { InputProps } from "../../../../types/builder";

export const InputBlock: Component<InputProps> = (props) => (
  <div>
    <label class="block text-sm font-medium text-gray-700">{props.label}</label>
    <input
      type="text"
      disabled
      placeholder={props.placeholder}
      class="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
    />
  </div>
);
