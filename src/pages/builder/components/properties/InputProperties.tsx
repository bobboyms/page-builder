import type { Component } from "solid-js";
import type { InputProps } from "../../../../types/builder";

export interface InputPropertiesProps {
  props: InputProps;
  onUpdate: (newProps: Partial<InputProps>) => void;
}

export const InputProperties: Component<InputPropertiesProps> = (props) => (
  <>
    <label class="block text-sm">
      Rótulo (Label):
      <input
        type="text"
        value={props.props.label}
        onInput={(e) => props.onUpdate({ label: e.currentTarget.value })}
        class="w-full mt-1 p-1 border rounded"
      />
    </label>
    <label class="block text-sm">
      Placeholder:
      <input
        type="text"
        value={props.props.placeholder}
        onInput={(e) => props.onUpdate({ placeholder: e.currentTarget.value })}
        class="w-full mt-1 p-1 border rounded"
      />
    </label>
  </>
);
