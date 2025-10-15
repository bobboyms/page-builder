import { Component, For, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
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
      copySelectedNode,
      pasteClipboardNode,
      hasClipboardNode,
    },
  } = useBuilderState();

  const [isPaletteOpen, setPaletteOpen] = createSignal(false);
  const [isPropertiesOpen, setPropertiesOpen] = createSignal(false);

  createEffect(() => {
    if (!selectedNode()) setPropertiesOpen(false);
  });

  const closeOverlays = () => {
    setPaletteOpen(false);
    setPropertiesOpen(false);
  };

  const handleTogglePreview = () => {
    togglePreview();
    closeOverlays();
  };

  const handlePaletteNodeSelect = (nodeId: string) => {
    const targetElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (targetElement instanceof HTMLElement) {
      selectNode(nodeId, targetElement);
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      selectNode(nodeId);
    }

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setPaletteOpen(false);
      setPropertiesOpen(true);
    }
  };

  const handleCanvasClick = () => {
    clearSelection();
    setPropertiesOpen(false);
    setPaletteOpen(false);
  };

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (editingNodeId() && e.key === "Escape") {
        stopEditing();
        return;
      }
      if (editingNodeId()) return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (isPreview()) return;

      const isModKey = e.metaKey || e.ctrlKey;

      if (isModKey) {
        const key = e.key.toLowerCase();

        if (key === "d" && selectedNodeId()) {
          e.preventDefault();
          duplicateNode();
          return;
        }

        if (key === "c" && selectedNodeId()) {
          e.preventDefault();
          copySelectedNode();
          return;
        }

        if (key === "v" && hasClipboardNode()) {
          e.preventDefault();
          pasteClipboardNode();
          return;
        }

        if (e.key === "ArrowUp" && selectedNodeId()) {
          e.preventDefault();
          moveSelectedNode("up");
          return;
        }

        if (e.key === "ArrowDown" && selectedNodeId()) {
          e.preventDefault();
          moveSelectedNode("down");
          return;
        }
      }

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

      <div class="md:hidden flex gap-2 px-4 py-3 border-b border-gray-200 bg-white">
        <button
          type="button"
          class="flex-1 rounded-md border border-ps-indigo px-3 py-2 text-sm font-medium text-ps-indigo"
          onClick={() => setPaletteOpen(true)}
        >
          Componentes
        </button>
        <button
          type="button"
          class="flex-1 rounded-md border border-ps-indigo px-3 py-2 text-sm font-medium text-ps-indigo disabled:border-gray-300 disabled:text-gray-400"
          onClick={() => setPropertiesOpen(true)}
          disabled={!selectedNode()}
        >
          Propriedades
        </button>
      </div>

      <button onClick={handleTogglePreview}>
        {isPreview() ? "Editar" : "Pré-visualizar"}
      </button>
      <main class="flex flex-1 overflow-hidden">
        <ComponentPalette
          tree={tree}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handlePaletteNodeSelect}
        />
        <section
          class="p-10 flex-1 min-w-0 h-full overflow-auto"
          onClick={handleCanvasClick}
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

      <Show when={isPaletteOpen()}>
        <div class="fixed inset-0 z-50 md:hidden">
          <div class="absolute inset-0 bg-black/50" onClick={closeOverlays} />
          <div class="absolute inset-y-0 left-0 flex h-full">
            <div class="relative h-full w-full max-w-sm">
              <ComponentPalette
                tree={tree}
                selectedNodeId={selectedNodeId}
                onNodeSelect={handlePaletteNodeSelect}
                variant="mobile"
              />
              <button
                type="button"
                class="absolute top-3 right-3 rounded bg-white/20 px-2 py-1 text-xs font-semibold text-white"
                onClick={closeOverlays}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Show>

      <Show when={isPropertiesOpen()}>
        <div class="fixed inset-0 z-50 md:hidden">
          <div class="absolute inset-0 bg-black/50" onClick={closeOverlays} />
          <div class="absolute inset-y-0 right-0 flex h-full">
            <div class="relative h-full w-full max-w-sm">
              <PropertyPanel
                selectedNode={selectedNode}
                onUpdateProps={updateProps}
                variant="mobile"
              />
              <button
                type="button"
                class="absolute top-3 right-3 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white"
                onClick={closeOverlays}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};
