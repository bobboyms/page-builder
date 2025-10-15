import type { JSX } from "solid-js";
import type { LayoutStyle } from "./layout";
import type { SizeModStyle, SizeValue } from "./size";

export interface TitleProps {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface InputProps {
  label: string;
  placeholder: string;
}

export interface ContainerProps {
  customClass?: string;
  layoutStyle: LayoutStyle;
  sizeModStyle: SizeModStyle;
  bgColor: string;
  width: SizeValue;
  height: SizeValue;
  gap: SizeValue;
  paddingW: SizeValue;
  paddingH: SizeValue;
  borderRadiusPicker: SizeValue;
}

type LeafNode =
  | { id: string; type: "title"; props: TitleProps; children: [] }
  | { id: string; type: "text-input"; props: InputProps; children: [] };

type ContainerNode = { id: string; type: "container"; props: ContainerProps; children: Node[] };

export type Node = LeafNode | ContainerNode;

export type ComponentType = Node["type"];

export interface TreeRoot {
  id: "root";
  children: Node[];
}

export type DropPosition = "before" | "after" | "inside";

export interface DraggedData {
  sourceId?: string;
  componentType?: ComponentType;
}

export interface DraggableNodeOptions {
  id: string;
  previewElement: () => HTMLElement;
}

export interface DraggablePaletteOptions {
  type: ComponentType;
}

export interface DroppableOptions {
  id: string;
  onDrop: (data: DraggedData, targetId: string, position: DropPosition) => void;
  acceptInside?: boolean;
}

export type NodeLocation = { parentId: string | "root"; index: number };

export type NodeIndex = Map<string, NodeLocation>;

export type NodeProps = Node["props"];

export type UpdateNodeProps =
  | Partial<TitleProps>
  | Partial<InputProps>
  | Partial<ContainerProps>;

export interface BuilderPreviewProps {
  node: Node;
}

export interface BlockRendererProps {
  node: Node;
  children?: JSX.Element;
  isEditing: boolean;
  onUpdate: (newProps: UpdateNodeProps) => void;
  onStopEditing: () => void;
  containerStyle?: JSX.CSSProperties;
}
