import type { Component, JSX } from "solid-js";
import { Match, Show, Switch } from "solid-js";
import { InputBlock } from "./InputBlock";
import { ContainerBlock } from "./ContainerBlock";
import { TitleBlock } from "./TitleBlock";
import type { BlockRendererProps, Node, TitleProps } from "../../../../types/builder";

export const BlockRenderer: Component<BlockRendererProps> = (props) => (
  <Switch>
    <Match when={props.node.type === "title" && props.node}>
      {(node) => (
        <TitleBlock
          {...(node().props as TitleProps)}
          isEditing={props.isEditing}
          onUpdate={props.onUpdate as (newProps: Partial<TitleProps>) => void}
          onStopEditing={props.onStopEditing}
        />
      )}
    </Match>
    <Match when={props.node.type === "text-input" && props.node}>
      {(node) => <InputBlock {...node().props} />}
    </Match>
    <Match when={props.node.type === "container" && props.node}>
      {(node) => (
        <ContainerBlock {...node().props} styleOverrides={props.containerStyle}>
          {props.children}
        </ContainerBlock>
      )}
    </Match>
    <Match when={true}>
      <div>Tipo de bloco desconhecido</div>
    </Match>
  </Switch>
);

export const noop = () => { };

export const previewWrapperSizing = (node: Node): JSX.CSSProperties | undefined => {
  if (node.type !== "container") return undefined;
  const props = node.props;
  switch (props.sizeModStyle) {
    case "fill":
      return { flex: "1 1 0", minWidth: 0, minHeight: 0 } as JSX.CSSProperties;
    case "fixed":
      return {
        width: `${props.width.value}${props.width.measurement}`,
        height: `${props.height.value}${props.height.measurement}`,
      } as JSX.CSSProperties;
    case "hug":
    default:
      return {
        flex: "0 0 auto",
        width: "fit-content",
        height: "fit-content",
        alignSelf: "flex-start",
      } as JSX.CSSProperties;
  }
};
