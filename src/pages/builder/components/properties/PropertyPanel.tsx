import { Component, Match, Show, Switch, type Accessor } from "solid-js";
import type {
  ContainerProps,
  InputProps,
  Node,
  TitleProps,
  UpdateNodeProps,
} from "../../../../types/builder";
import { ContainerProperties } from "./ContainerProperties";
import { InputProperties } from "./InputProperties";
import { TitleProperties } from "./TitleProperties";

type PropertyPanelVariant = "desktop" | "mobile";

export interface PropertyPanelProps {
  selectedNode: Accessor<Node | null>;
  onUpdateProps: (nodeId: string, newProps: UpdateNodeProps) => void;
  variant?: PropertyPanelVariant;
}

export const PropertyPanel: Component<PropertyPanelProps> = (props) => {
  const handleUpdate = (newProps: UpdateNodeProps) => {
    const node = props.selectedNode();
    if (node) props.onUpdateProps(node.id, newProps);
  };

  const baseClasses: Record<PropertyPanelVariant, string> = {
    desktop: "hidden md:flex md:flex-col w-64 flex-shrink-0 p-3 border-l bg-ps-black-1 text-white h-full overflow-y-auto",
    mobile: "flex flex-col w-full max-w-sm h-full p-4 bg-ps-black-1 text-white overflow-y-auto",
  };

  const variant = props.variant ?? "desktop";

  return (
    <aside class={baseClasses[variant]}>
      <h2 class="text-lg font-semibold mb-4">Propriedades</h2>
      <Show when={props.selectedNode()} fallback={<div class="text-gray-500">Selecione um bloco para editar.</div>}>
        {(node) => (
          <div class="space-y-4 min-w-0">
            <div class="text-sm text-gray-500 break-words">ID: {node().id}</div>
            <Switch>
              <Match when={node().type === "title"}>
                <TitleProperties props={node().props as TitleProps} onUpdate={handleUpdate} />
              </Match>
              <Match when={node().type === "text-input"}>
                <InputProperties props={node().props as InputProps} onUpdate={handleUpdate} />
              </Match>
              <Match when={node().type === "container"}>
                <ContainerProperties props={node().props as ContainerProps} onUpdate={handleUpdate} />
              </Match>
            </Switch>
          </div>
        )}
      </Show>
    </aside>
  );
};
