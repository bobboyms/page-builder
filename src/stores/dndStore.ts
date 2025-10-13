import { createStore } from "solid-js/store";
import type { DraggedData, DropPosition } from "../types/builder";
	export interface DnDState {
  draggedData: DraggedData | null;
  lastTargetId: string | null;
  lastPos: DropPosition | null;
}

export const [dndStore, setDnDStore] = createStore<DnDState>({
  draggedData: null,
  lastTargetId: null,
  lastPos: null,
});
