import { Component, For, Show } from "solid-js";
import type { Accessor } from "solid-js";
import type { ComponentType, Node, TreeRoot } from "../../../../types/builder";
import { PaletteItem } from "./PaletteItem";

const componentLabels: Record<ComponentType, string> = {
  title: "Título",
  "text-input": "Campo de Texto",
  container: "Container",
};

interface TreeSharedProps {
  selectedNodeId: Accessor<string | null>;
  onNodeSelect: (nodeId: string) => void;
}

const TreeBranch: Component<{ nodes: Node[] } & TreeSharedProps> = (props) => (
  <ul class="pl-3 border-l border-white/10 space-y-1">
    <For each={props.nodes}>
      {(node) => (
        <TreeNode node={node} selectedNodeId={props.selectedNodeId} onNodeSelect={props.onNodeSelect} />
      )}
    </For>
  </ul>
);

type ContainerTreeNode = Extract<Node, { type: "container" }>;

const TreeNode: Component<{ node: Node } & TreeSharedProps> = (props) => {
  const isSelected = () => props.selectedNodeId() === props.node.id;

  return (
  <li class="space-y-1">
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm transition-colors"
        classList={{
          "bg-white/20 text-white": isSelected(),
          "hover:bg-white/10": !isSelected(),
        }}
        onClick={(event) => {
          event.preventDefault();
          props.onNodeSelect(props.node.id);
        }}
      >
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
        <span class="font-medium">{componentLabels[props.node.type]}</span>
      </button>
    <Show when={props.node.type === "container" && props.node.children.length > 0}>
      <TreeBranch
        nodes={(props.node as ContainerTreeNode).children}
        selectedNodeId={props.selectedNodeId}
        onNodeSelect={props.onNodeSelect}
      />
    </Show>
  </li>
  );
};

const TreeView: Component<{ root: TreeRoot } & TreeSharedProps> = (props) => (
  <div class="mt-6 rounded-md bg-white/5 p-3">
    <h3 class="text-sm font-semibold uppercase tracking-wide text-white/80">Estrutura</h3>
    <Show
      when={props.root.children.length > 0}
      fallback={<p class="mt-2 text-xs text-white/60">Nenhum componente adicionado ainda.</p>}
    >
      <div class="mt-2 space-y-1 text-white/90">
        <TreeBranch
          nodes={props.root.children}
          selectedNodeId={props.selectedNodeId}
          onNodeSelect={props.onNodeSelect}
        />
      </div>
    </Show>
  </div>
);

type PaletteVariant = "desktop" | "mobile";

export const ComponentPalette: Component<{
  tree: TreeRoot;
  selectedNodeId: Accessor<string | null>;
  onNodeSelect: (nodeId: string) => void;
  variant?: PaletteVariant;
}> = (props) => {
  const baseClasses: Record<PaletteVariant, string> = {
    desktop: "hidden md:flex md:flex-col w-52 flex-shrink-0 h-full p-4 border-r bg-ps-indigo text-white overflow-y-auto",
    mobile: "flex flex-col w-full max-w-sm h-full p-4 bg-ps-indigo text-white overflow-y-auto",
  };

  const variant = props.variant ?? "desktop";

  return (
    <aside class={baseClasses[variant]}>
      <h2 class="text-lg font-semibold">Componentes</h2>
      <div class="mt-4 space-y-2">
        <PaletteItem type="title" label="Título" />
        <PaletteItem type="text-input" label="Campo de Texto" />
        <PaletteItem type="container" label="Container" />
      </div>
      <TreeView root={props.tree} selectedNodeId={props.selectedNodeId} onNodeSelect={props.onNodeSelect} />
    </aside>
  );
};
