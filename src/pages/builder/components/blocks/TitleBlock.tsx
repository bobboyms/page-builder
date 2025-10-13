import { Component, Show, createEffect, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { TitleProps } from "../../../../types/builder";

export interface TitleBlockProps extends TitleProps {
  isEditing: boolean;
  onUpdate: (newProps: Partial<TitleProps>) => void;
  onStopEditing: () => void;
}

export const TitleBlock: Component<TitleBlockProps> = (props) => {
  const tag = createMemo(() => `h${props.level || 1}`);
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    if (props.isEditing && inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  });

  return (
    <Show
      when={!props.isEditing}
      fallback={
        <input
          ref={inputRef}
          type="text"
          value={props.text}
          class="font-bold w-full p-0 m-0 border-blue-500 border-2 rounded focus:outline-none"
          onInput={(e) => props.onUpdate({ text: e.currentTarget.value })}
          onBlur={props.onStopEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") props.onStopEditing();
          }}
        />
      }
    >
      <Dynamic component={tag()} class="font-bold">
        {props.text}
      </Dynamic>
    </Show>
  );
};
