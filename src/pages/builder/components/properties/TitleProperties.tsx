import { Component, For } from "solid-js";
import type { TitleProps } from "../../../../types/builder";

export interface TitlePropertiesProps {
  props: TitleProps;
  onUpdate: (newProps: Partial<TitleProps>) => void;
}

export const TitleProperties: Component<TitlePropertiesProps> = (props) => (
  <>
    <label class="block text-sm">
      Texto:
      <input
        type="text"
        value={props.props.text}
        onInput={(e) => props.onUpdate({ text: e.currentTarget.value })}
        class="w-full mt-1 p-1 border rounded"
      />
    </label>
    <label class="block text-sm">
      Nível (h1-h6):
      <select
        value={props.props.level}
        onChange={(e) => props.onUpdate({ level: parseInt(e.currentTarget.value, 10) as TitleProps["level"] })}
        class="w-full mt-1 p-1 border rounded"
      >
        <For each={[1, 2, 3, 4, 5, 6]}>{(level) => <option value={level}>{level}</option>}</For>
      </select>
    </label>
  </>
);
