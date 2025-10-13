import type { ComponentType, Node, TreeRoot } from "../types/builder";

export const findNode = (nodeId: string, current: TreeRoot | Node): Node | null => {
  if ("type" in current && current.id === nodeId) {
    return current;
  }
  for (const child of current.children) {
    const result = findNode(nodeId, child);
    if (result) return result;
  }
  return null;
};

export const createNewNode = (type: ComponentType): Node => {
  const base = { id: crypto.randomUUID(), children: [] as [] };
  switch (type) {
    case "title":
      return { ...base, type, props: { text: "Novo Título", level: 1 } };
    case "text-input":
      return {
        ...base,
        type,
        props: { label: "Novo Rótulo", placeholder: "Digite aqui..." },
      };
    case "container":
      return {
        ...base,
        type,
        children: [],
        props: {
          customClass: "",
          layoutStyle: "split-horizontal",
          sizeModStyle: "fill",
          bgColor: "#ffffff",
          width: { value: "100", measurement: "px" },
          height: { value: "100", measurement: "px" },
          gap: { value: "4", measurement: "px" },

          paddingW: { value: "20", measurement: "px" },
          paddingH: { value: "20", measurement: "px" },
          borderRadiusPicker: { value: "0", measurement: "px" }
        },
      } as Node;
    default:
      throw new Error("Tipo de componente desconhecido");
  }
};

export const cloneNodeWithNewIds = (node: Node): Node => {
  const newNode: Node = {
    ...node,
    id: crypto.randomUUID(),
    props: JSON.parse(JSON.stringify(node.props)),
    children: node.children.map(cloneNodeWithNewIds) as any,
  };
  return newNode;
};
