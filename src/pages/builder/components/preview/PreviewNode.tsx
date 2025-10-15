import { Component, For } from "solid-js";
import type { BuilderPreviewProps } from "../../../../types/builder";
import { BlockRenderer, noop, previewWrapperSizing } from "../blocks/BlockRenderer";

export const PreviewNode: Component<BuilderPreviewProps> = (props) => {
  const wrapperStyle = previewWrapperSizing(props.node);

  return (
    <BlockRenderer
      node={props.node}
      isEditing={false}
      onUpdate={noop}
      onStopEditing={noop}
      containerStyle={wrapperStyle}
    >
      <For each={props.node.type === "container" ? props.node.children : []}>
        {(child) => <PreviewNode node={child} />}
      </For>
    </BlockRenderer>
  );
};
