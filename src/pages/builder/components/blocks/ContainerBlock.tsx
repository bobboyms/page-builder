import type { Component, JSX } from "solid-js";
import type { ContainerProps } from "../../../../types/builder";
import { layoutClasses } from "../../../../utils/layout";
import { sizeModTypeClasses } from "../../../../utils/sizeMode";

export const ContainerBlock: Component<ContainerProps & { children?: JSX.Element }> = (props) => {
  const style = (): JSX.CSSProperties => ({
    ...layoutClasses(props.layoutStyle),
    ...sizeModTypeClasses(props.sizeModStyle),
    width: props.sizeModStyle === "fixed" || props.sizeModStyle === "fill" ? "100%" : "fit-content",
    height: props.sizeModStyle === "fixed" ? "100%" : "auto",
    gap: `${props.gap.value}${props.gap.measurement}`,
    padding: `${props.paddingH.value}${props.paddingH.measurement}` + " " + `${props.paddingW.value}${props.paddingW.measurement}`,
    "background-color": props.bgColor,
    "border-radius": `${props.borderRadiusPicker.value}${props.borderRadiusPicker.measurement}`,
  });

  return <div style={style()}>{props.children}</div>;
};
