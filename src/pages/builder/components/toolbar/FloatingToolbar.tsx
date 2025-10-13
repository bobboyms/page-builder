import { Component, Show } from "solid-js";
import { IconArrowDown, IconArrowUp, IconCopy, IconTrash } from "../icons";
import type { ToolbarPosition } from "../../hooks/useBuilderState";

export interface FloatingToolbarProps {
  position: ToolbarPosition;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const FloatingToolbar: Component<FloatingToolbarProps> = (props) => (
  <Show when={props.position.visible}>
    <div
      class="fixed flex items-center gap-1 bg-gray-800 text-white p-1 rounded-md shadow-lg z-50"
      style={{
        top: `${props.position.top}px`,
        left: `${props.position.left}px`,
        transform: "translateY(-100%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button title="Mover para Cima" onClick={props.onMoveUp} class="p-1.5 rounded hover:bg-gray-700">
        <IconArrowUp />
      </button>
      <button title="Mover para Baixo" onClick={props.onMoveDown} class="p-1.5 rounded hover:bg-gray-700">
        <IconArrowDown />
      </button>
      <div class="w-px h-5 bg-gray-600" />
      <button title="Duplicar" onClick={props.onDuplicate} class="p-1.5 rounded hover:bg-gray-700">
        <IconCopy />
      </button>
      <button title="Excluir" onClick={props.onDelete} class="p-1.5 rounded hover:bg-red-500">
        <IconTrash />
      </button>
    </div>
  </Show>
);
