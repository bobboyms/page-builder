import { Component, For, Show, onCleanup, onMount } from "solid-js";
import { droppable } from "../../directives";
import { Block } from "./components/blocks/Block";
import { ComponentPalette } from "./components/palette/ComponentPalette";
import { PropertyPanel } from "./components/properties/PropertyPanel";
import { PreviewNode } from "./components/preview/PreviewNode";
import { FloatingToolbar } from "./components/toolbar/FloatingToolbar";
import { Header } from "./components/layout/Header";
import { useBuilderState } from "./hooks/useBuilderState";

export const BuilderPage: Component = () => {
  const {
    tree,
    selectedNode,
    selectedNodeId,
    editingNodeId,
    isPreview,
    toolbarPosition,
    actions: {
      selectNode,
      drop,
      updateProps,
      deleteNode,
      duplicateNode,
      moveSelectedNode,
      startEditing,
      stopEditing,
      togglePreview,
      clearSelection,
    },
  } = useBuilderState();

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (editingNodeId() && e.key === "Escape") {
        stopEditing();
        return;
      }
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (e.key === "Delete" && selectedNodeId()) {
        e.preventDefault();
        deleteNode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return (
    <div class="h-screen flex flex-col font-inter">
      <Header />
      <Show when={!isPreview()}>
        <FloatingToolbar
          position={toolbarPosition()}
          onDelete={deleteNode}
          onDuplicate={duplicateNode}
          onMoveUp={() => moveSelectedNode("up")}
          onMoveDown={() => moveSelectedNode("down")}
        />
      </Show>


      <button onClick={togglePreview}>
        {isPreview() ? "Editar" : "Pré-visualizar"}
      </button>
      <main class="flex flex-1 overflow-hidden">
        <ComponentPalette />
        <section
          class="p-10 flex-1 min-w-0 h-full overflow-auto"
          onClick={() => {
            clearSelection();
          }}
        >
          <Show
            when={isPreview()}
            fallback={
              <div
                id="canvas"
                use:droppable={{ id: "root", onDrop: drop, acceptInside: true }}
                class="min-h-full bg-white"
              >
                <Show
                  when={tree.children.length > 0}
                  fallback={
                    <div class="flex items-center justify-center h-full text-center text-gray-500">
                      Arraste componentes da paleta para começar a construir sua página.
                    </div>
                  }
                >
                  <For each={tree.children}>
                    {(node) => (
                      <Block
                        node={node}
                        onDrop={drop}
                        selectedNodeId={selectedNodeId}
                        onSelect={selectNode}
                        editingNodeId={editingNodeId}
                        onStartEditing={startEditing}
                        onStopEditing={stopEditing}
                        onUpdateProps={updateProps}
                      />
                    )}
                  </For>
                </Show>
              </div>
            }
          >
            <div id="canvas" class="min-h-full bg-white">
              <For each={tree.children}>{(node) => <PreviewNode node={node} />}</For>
            </div>
          </Show>
        </section>
        <PropertyPanel selectedNode={selectedNode} onUpdateProps={updateProps} />
      </main>
    </div>
  );
};
