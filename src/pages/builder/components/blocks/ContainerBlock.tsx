import type { Component, JSX } from "solid-js";
import type { ContainerProps } from "../../../../types/builder";
import { layoutClasses } from "../../../../utils/layout";
import { sizeModTypeClasses } from "../../../../utils/sizeMode";

export const ContainerBlock: Component<ContainerProps & { children?: JSX.Element; styleOverrides?: JSX.CSSProperties }> = (props) => {
  const baseStyle = (): JSX.CSSProperties => ({
    ...layoutClasses(props.layoutStyle),
    ...sizeModTypeClasses(props.sizeModStyle),
    width: props.sizeModStyle === "fixed" ? `${props.width.value}${props.width.measurement}` : "auto",
    height: props.sizeModStyle === "fixed" ? `${props.height.value}${props.height.measurement}` : "auto",
    gap: `${props.gap.value}${props.gap.measurement}`,
    padding: `${props.paddingH.value}${props.paddingH.measurement}` + " " + `${props.paddingW.value}${props.paddingW.measurement}`,
    "background-color": props.bgColor,
    "border-radius": `${props.borderRadiusPicker.value}${props.borderRadiusPicker.measurement}`,
    "box-sizing": "border-box",
  });

  return <div style={{ ...baseStyle(), ...(props.styleOverrides ?? {}) }}>{props.children}</div>;
};
