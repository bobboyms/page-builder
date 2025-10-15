import type { Accessor, Component, JSX } from "solid-js";
import { For, Show, createSignal } from "solid-js";
import { draggableNode, droppable } from "../../../../directives";
import type { DroppableOptions, Node } from "../../../../types/builder";
import type { ContainerProps } from "../../../../types/builder";
import { IconGrabber } from "../icons";
import { BlockRenderer } from "./BlockRenderer";

export interface BlockProps {
  node: Node;
  onDrop: DroppableOptions["onDrop"];
  selectedNodeId: Accessor<string | null>;
  onSelect: (id: string, element: HTMLElement) => void;
  editingNodeId: Accessor<string | null>;
  onStartEditing: (id: string) => void;
  onStopEditing: () => void;
  onUpdateProps: (nodeId: string, newProps: Partial<Node["props"]>) => void;
}

const containerWrapperSizing = (props: ContainerProps): JSX.CSSProperties => {
  const baseSizing = {
    "box-sizing": props.sizeModStyle === "fixed" ? "content-box" : "border-box",
  } as JSX.CSSProperties;

  switch (props.sizeModStyle) {
    case "fill":
      return {
        ...baseSizing,
        flex: "1 1 0",
        minWidth: 0,
        minHeight: 0,
      } as JSX.CSSProperties;
    case "fixed":
      return {
        ...baseSizing,
        flex: "0 0 auto",
        width: `${props.width.value}${props.width.measurement}`,
        height: `${props.height.value}${props.height.measurement}`,
      } as JSX.CSSProperties;
    case "hug":
    default:
      return {
        ...baseSizing,
        flex: "0 0 auto",
        width: "fit-content",
        height: "fit-content",
        alignSelf: "flex-start",
      } as JSX.CSSProperties;
  }
};

const blockWrapperSizing = (node: Node): JSX.CSSProperties => {
  if (node.type === "container") {
    return containerWrapperSizing(node.props as ContainerProps);
  }

  if (node.type === "title") {
    return {
      display: "inline-flex",
      flexDirection: "column",
      width: "fit-content",
      maxWidth: "100%",
      height: "fit-content",
      alignSelf: "flex-start",
    } as JSX.CSSProperties;
  }

  return { flex: "0 0 auto", width: "100%", height: "auto" } as JSX.CSSProperties;
};

export const Block: Component<BlockProps> = (props) => {
  const isSelected = () => props.selectedNodeId() === props.node.id;
  let blockRef: HTMLDivElement | undefined;
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      ref={blockRef}
      data-node-id={props.node.id}
      use:droppable={{ id: props.node.id, onDrop: props.onDrop, acceptInside: props.node.type === "container" }}
      onClick={(e) => {
        e.stopPropagation();
        if (blockRef) props.onSelect(props.node.id, blockRef);
      }}
      onDblClick={(e) => {
        e.stopPropagation();
        if (props.node.type === "title") props.onStartEditing(props.node.id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      class="relative transition-shadow hover:shadow-lg box-border"
      classList={{
        "border-2 border-solid border-blue-500 shadow-xl": isSelected(),
        "border border-solid border-blue-500": !isSelected() && isHovered(),
        "border border-dashed border-gray-200": !isSelected() && !isHovered(),
      }}
      style={blockWrapperSizing(props.node)}
    >
      <Show when={isSelected()}>
        <button
          use:draggableNode={{ id: props.node.id, previewElement: () => blockRef! }}
          title="Arraste para mover"
          aria-label="Mover bloco"
          class="absolute -top-[2px] -left-[2px] z-10 flex items-center justify-center w-6 h-6 bg-blue-500 rounded cursor-grab active:cursor-grabbing"
        >
          <IconGrabber />
        </button>
      </Show>

      <BlockRenderer
        node={props.node}
        isEditing={props.editingNodeId() === props.node.id}
        onUpdate={(newProps) => props.onUpdateProps(props.node.id, newProps)}
        onStopEditing={props.onStopEditing}
      >
        <For each={props.node.type === "container" ? props.node.children : []}>
          {(child) => (
            <Block
              node={child}
              onDrop={props.onDrop}
              selectedNodeId={props.selectedNodeId}
              onSelect={props.onSelect}
              editingNodeId={props.editingNodeId}
              onStartEditing={props.onStartEditing}
              onStopEditing={props.onStopEditing}
              onUpdateProps={props.onUpdateProps}
            />
          )}
        </For>
      </BlockRenderer>
    </div>
  );
};
