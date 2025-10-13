import { createEffect, createMemo, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type {
  ComponentType,
  DraggedData,
  DropPosition,
  Node,
  NodeIndex,
  TreeRoot,
  UpdateNodeProps,
} from "../../../types/builder";
import { cloneNodeWithNewIds, createNewNode, findNode } from "../../../utils/tree";

export interface ToolbarPosition {
  top: number;
  left: number;
  visible: boolean;
}

const initialToolbar: ToolbarPosition = { top: 0, left: 0, visible: false };

export const useBuilderState = () => {
  const initialTree: TreeRoot = { id: "root", children: [] };
  const [tree, setTree] = createStore<TreeRoot>(initialTree);
  const [selectedNodeId, setSelectedNodeId] = createSignal<string | null>(null);
  const [toolbarPosition, setToolbarPosition] = createSignal<ToolbarPosition>(initialToolbar);
  const [editingNodeId, setEditingNodeId] = createSignal<string | null>(null);
  const [isPreview, setIsPreview] = createSignal(false);
  const [nodeIndex, setNodeIndex] = createSignal<NodeIndex>(new Map());

  createEffect(() => {
    const newIndex: NodeIndex = new Map();
    const buildIndex = (current: TreeRoot | Node) => {
      current.children.forEach((child, index) => {
        newIndex.set(child.id, { parentId: current.id, index });
        if (child.children?.length) buildIndex(child);
      });
    };
    buildIndex(tree);
    setNodeIndex(newIndex);
  });

  const selectedNode = createMemo(() => {
    const id = selectedNodeId();
    return id ? findNode(id, tree) : null;
  });

  const resetToolbar = () => setToolbarPosition(initialToolbar);

  const selectNode = (nodeId: string | null, element?: HTMLElement) => {
    if (editingNodeId()) return;
    setSelectedNodeId(nodeId);
    if (nodeId && element) {
      const rect = element.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        visible: true,
      });
    } else {
      resetToolbar();
    }
  };

  const moveNode = (sourceId: string, targetId: string, position: DropPosition) => {
    const indexSnapshot = nodeIndex();
    setTree(produce((draft) => {
      const sourceLocation = indexSnapshot.get(sourceId);
      if (!sourceLocation) return;

      const isMovingInsideItself = (target: string, source: string) => {
        let currentId: string | "root" | undefined = target;
        while (currentId && currentId !== "root") {
          if (currentId === source) return true;
          currentId = indexSnapshot.get(currentId)?.parentId;
        }
        return false;
      };
      if (isMovingInsideItself(targetId, sourceId)) return;

      const sourceParentDraft = sourceLocation.parentId === "root" ? draft : findNode(sourceLocation.parentId, draft);
      if (!sourceParentDraft) return;

      const [nodeToMove] = sourceParentDraft.children.splice(sourceLocation.index, 1);
      if (!nodeToMove) return;

      if (position === "inside") {
        const targetNodeDraft = targetId === "root" ? draft : findNode(targetId, draft);
        if (targetNodeDraft && "children" in targetNodeDraft) {
          (targetNodeDraft.children as Node[]).push(nodeToMove);
        }
      } else {
        const targetLocation = indexSnapshot.get(targetId);
        if (!targetLocation) return;
        const targetParentDraft =
          targetLocation.parentId === "root" ? draft : findNode(targetLocation.parentId, draft);
        if (targetParentDraft) {
          const newIndex = position === "before" ? targetLocation.index : targetLocation.index + 1;
          targetParentDraft.children.splice(newIndex, 0, nodeToMove);
        }
      }
    }));
  };

  const addNode = (type: ComponentType, targetId: string, position: DropPosition) => {
    const indexSnapshot = nodeIndex();
    const newNode = createNewNode(type);
    setTree(produce((draft) => {
      if (position === "inside") {
        const targetNodeDraft = targetId === "root" ? draft : findNode(targetId, draft);
        if (
          targetNodeDraft &&
          (targetNodeDraft.id === "root" || ("type" in targetNodeDraft && targetNodeDraft.type === "container"))
        ) {
          (targetNodeDraft.children as Node[]).push(newNode);
        }
      } else {
        const targetLocation = indexSnapshot.get(targetId);
        if (targetLocation) {
          const parentDraft = targetLocation.parentId === "root" ? draft : findNode(targetLocation.parentId, draft);
          if (parentDraft) {
            const insertIndex = position === "before" ? targetLocation.index : targetLocation.index + 1;
            parentDraft.children.splice(insertIndex, 0, newNode);
          }
        } else if (targetId === "root") {
          (draft.children as Node[]).push(newNode);
        }
      }
    }));
  };

  const drop = (data: DraggedData, targetId: string, position: DropPosition) => {
    if (data.sourceId) moveNode(data.sourceId, targetId, position);
    else if (data.componentType) addNode(data.componentType, targetId, position);
  };

  const updateProps = (nodeId: string, newProps: UpdateNodeProps) => {
    setTree(produce((draft) => {
      const nodeToUpdate = findNode(nodeId, draft);
      if (nodeToUpdate) Object.assign(nodeToUpdate.props, newProps);
    }));
  };

  const deleteNode = () => {
    const id = selectedNodeId();
    if (!id) return;
    const indexSnapshot = nodeIndex();
    setTree(produce((draft) => {
      const location = indexSnapshot.get(id);
      if (!location) return;
      const parent = location.parentId === "root" ? draft : findNode(location.parentId, draft);
      if (parent) parent.children.splice(location.index, 1);
    }));
    selectNode(null);
  };

  const duplicateNode = () => {
    const id = selectedNodeId();
    if (!id) return;
    const indexSnapshot = nodeIndex();
    setTree(produce((draft) => {
      const location = indexSnapshot.get(id);
      const nodeToClone = findNode(id, draft);
      if (!location || !nodeToClone) return;
      const parent = location.parentId === "root" ? draft : findNode(location.parentId, draft);
      if (parent) {
        const clonedNode = cloneNodeWithNewIds(nodeToClone);
        parent.children.splice(location.index + 1, 0, clonedNode);
      }
    }));
  };

  const moveSelectedNode = (direction: "up" | "down") => {
    const id = selectedNodeId();
    if (!id) return;
    const indexSnapshot = nodeIndex();
    setTree(produce((draft) => {
      const location = indexSnapshot.get(id);
      if (!location) return;
      const parent = location.parentId === "root" ? draft : findNode(location.parentId, draft);
      if (!parent) return;
      const siblings = parent.children;
      const currentIndex = location.index;
      if (direction === "up" && currentIndex > 0) {
        [siblings[currentIndex], siblings[currentIndex - 1]] = [siblings[currentIndex - 1], siblings[currentIndex]];
      } else if (direction === "down" && currentIndex < siblings.length - 1) {
        [siblings[currentIndex], siblings[currentIndex + 1]] = [siblings[currentIndex + 1], siblings[currentIndex]];
      }
    }));
  };

  const startEditing = (nodeId: string) => {
    selectNode(null);
    setEditingNodeId(nodeId);
  };

  const stopEditing = () => setEditingNodeId(null);

  const togglePreview = () => setIsPreview((prev) => !prev);

  const clearSelection = () => {
    selectNode(null);
    stopEditing();
  };

  return {
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
      setToolbarPosition,
      setIsPreview,
    },
  };
};
