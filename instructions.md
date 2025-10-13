Sim — dá pra ter a simplicidade do **Auto-Layout do Figma** e ainda gerar **HTML/CSS reais**. A ideia é você expor **poucos controles de alto nível** (estilo Figma) e mapear isso para **Flex/Grid/Absolute** por baixo dos panos.

Aqui vai um guia prático (com mapeamentos + código) para implementar no seu page builder.

---

# 1) Modelo mental (camadas)

## Camada 1 — Contêiner (layout do pai)

- **Layout**: `none | flex | grid | absolute`
- **Direction** (se flex): `row | column`
- **Gap**
- **Justify** (eixo principal): `start | center | end | space-between | space-around | space-evenly`
- **Align (cross)**: `start | center | end | stretch`
- **Wrap**: `nowrap | wrap`
- **Padding**: (top/right/bottom/left) ou um só valor

## Camada 2 — Item (comportamento do filho dentro do pai)

- **Size mode (largura / altura)**:

  - **Hug contents** → “abraça o conteúdo”
  - **Fixed** → valor numérico + unidade
  - **Fill** → ocupa o espaço disponível

- **Flex item**: `grow`, `shrink`, `basis` (mas você esconde isso e controla via “Fill/Hug/Fixed”)
- **Align self** (override do align do pai)
- **Order** (opcional)

## Camada 3 — Responsivo

- Mesmo set de controles com **breakpoints** (abas: Base / sm / md / lg…).

---

# 2) Tabela de mapeamentos (o segredo)

### Em **container** flex

| Controle (UI)     | CSS gerado                             |
| ----------------- | -------------------------------------- |
| Direction: Row    | `display:flex; flex-direction:row;`    |
| Direction: Column | `display:flex; flex-direction:column;` |
| Gap: 8            | `gap:8px;`                             |
| Justify: Center   | `justify-content:center;`              |
| Align: Stretch    | `align-items:stretch;`                 |
| Wrap: Yes         | `flex-wrap:wrap;`                      |

### Em **item** filho (dentro de flex **row**)

| Size mode (Width) | CSS típico                                                                             |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Hug**           | `flex:0 1 auto; width:auto;` (recomendo também `min-width:0` se haverá conteúdo longo) |
| **Fixed** (320px) | `flex:0 0 auto; width:320px;`                                                          |
| **Fill**          | `flex:1 1 0; min-width:0;` (ou `flex:1 1 auto; min-width:0;`)                          |

> Em **flex column**, troque “width” por “height” na mesma lógica.

### Em **grid** (container)

| Controle (UI)         | CSS gerado                                           |
| --------------------- | ---------------------------------------------------- |
| Cols: 2               | `display:grid; grid-template-columns:repeat(2,1fr);` |
| Gap: 12               | `gap:12px;`                                          |
| Align items: center   | `align-items:center;`                                |
| Justify items: center | `justify-items:center;`                              |

### Em **absolute**

| Controle (UI)                 | CSS gerado                                             |
| ----------------------------- | ------------------------------------------------------ |
| X, Y, W, H (num + unidade)    | `position:absolute; left:…; top:…; width:…; height:…;` |
| “Pin” (Left/Right/Top/Bottom) | defina `inset` conforme os pinos                       |

---

# 3) Implementação (Solid) — helpers

## 3.1. Tipos simplificados

```ts
type LayoutMode = "none" | "flex" | "grid" | "absolute";
type Direction = "row" | "column";
type SizeMode = "hug" | "fixed" | "fill";

type ContainerLayout = {
  mode: LayoutMode;
  direction?: Direction; // se flex
  gap?: string; // "8px"
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
  gridCols?: number; // se grid
  padding?: { t?: string; r?: string; b?: string; l?: string } | string;
};

type ItemLayout = {
  widthMode?: SizeMode;
  widthValue?: string; // se fixed: "320px" | "50%" etc
  heightMode?: SizeMode;
  heightValue?: string;
  alignSelf?: "auto" | "start" | "center" | "end" | "stretch";
  order?: number;
};
```

## 3.2. Container → CSS inline

```ts
export function containerStyle(c: ContainerLayout): JSX.CSSProperties {
  if (c.mode === "flex") {
    return {
      display: "flex",
      flexDirection: c.direction ?? "row",
      gap: c.gap,
      justifyContent: mapJustify(c.justify),
      alignItems: mapAlign(c.align),
      flexWrap: c.wrap ? "wrap" : "nowrap",
      ...paddingToStyle(c.padding),
    };
  }
  if (c.mode === "grid") {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${c.gridCols ?? 2}, minmax(0, 1fr))`,
      gap: c.gap,
      ...paddingToStyle(c.padding),
    };
  }
  if (c.mode === "absolute") {
    // normalmente o container pai é relative
    return { position: "relative", ...paddingToStyle(c.padding) };
  }
  return { ...paddingToStyle(c.padding) };
}

function mapJustify(v?: ContainerLayout["justify"]) {
  switch (v) {
    case "start":
      return "flex-start";
    case "center":
      return "center";
    case "end":
      return "flex-end";
    case "space-between":
      return "space-between";
    case "space-around":
      return "space-around";
    case "space-evenly":
      return "space-evenly";
    default:
      return undefined;
  }
}
function mapAlign(v?: ContainerLayout["align"]) {
  switch (v) {
    case "start":
      return "flex-start";
    case "center":
      return "center";
    case "end":
      return "flex-end";
    case "stretch":
      return "stretch";
    default:
      return undefined;
  }
}
function paddingToStyle(p?: ContainerLayout["padding"]) {
  if (!p) return {};
  if (typeof p === "string") return { padding: p };
  return {
    paddingTop: p.t,
    paddingRight: p.r,
    paddingBottom: p.b,
    paddingLeft: p.l,
  };
}
```

## 3.3. Item → CSS inline (dentro de flex)

```ts
export function itemStyle(
  item: ItemLayout,
  parent: ContainerLayout
): JSX.CSSProperties {
  const style: JSX.CSSProperties = {};

  // Largura (eixo principal se row)
  if (parent.mode === "flex" && parent.direction === "row") {
    if (item.widthMode === "fill") {
      Object.assign(style, { flex: "1 1 0", minWidth: 0 });
    } else if (item.widthMode === "hug") {
      Object.assign(style, { flex: "0 1 auto", width: "auto", minWidth: 0 });
    } else if (item.widthMode === "fixed" && item.widthValue) {
      Object.assign(style, { flex: "0 0 auto", width: item.widthValue });
    }
    // Altura transversal
    if (item.heightMode === "fixed" && item.heightValue)
      style.height = item.heightValue;
  }

  // Em column, troque width/height (mesma lógica)
  if (parent.mode === "flex" && parent.direction === "column") {
    if (item.heightMode === "fill") {
      Object.assign(style, { flex: "1 1 0", minHeight: 0 });
    } else if (item.heightMode === "hug") {
      Object.assign(style, { flex: "0 1 auto", height: "auto", minHeight: 0 });
    } else if (item.heightMode === "fixed" && item.heightValue) {
      Object.assign(style, { flex: "0 0 auto", height: item.heightValue });
    }
    if (item.widthMode === "fixed" && item.widthValue)
      style.width = item.widthValue;
  }

  if (item.alignSelf && item.alignSelf !== "auto") {
    style.alignSelf = mapAlign(item.alignSelf as any);
  }
  if (typeof item.order === "number") style.order = item.order;

  return style;
}
```

> **Detalhe importante**: use `min-width:0` (ou `min-height:0` em column) nos itens que podem “Fill”, para evitar overflow quando houver conteúdo grande.

---

# 4) UI mínima (inspiração Figma)

- **Layout** (segmented): None / Flex / Grid / Absolute
- **Quando Flex**: Direction, Gap, Justify, Align, Wrap
- **Quando Grid**: Cols, Gap, Align items, Justify items
- **Size (por item)**: Width → Hug | Fixed (px/%) | Fill ; Height → idem
- **Flex item** (avançado): Grow/Shrink/Basis (escondido; sincronize com Size Mode)
- **Responsivo**: Abas Base/sm/md… (aplique overrides por breakpoint)

**Presets úteis** (“Center both”, “Space-between”, “Stack vertical”) = só atalho para setar os campos acima.

---

# 5) Exemplos de problemas clássicos que isso resolve

- “`width:100%` no flex row não ocupa tudo” → use **Fill** = `flex:1 1 0; min-width:0;`.
- “Meu item não encolhe” → `min-width:0` (ou `min-height:0` em column).
- “Dois itens devem dividir igualmente” → ambos em **Fill** (`flex:1 1 0`) ou “Fixed” com `flex:0 0 X` (o outro em Fill).

---

# 6) Renderização no seu `ContainerBlock`

```tsx
// Exemplo: aplicar CSS puro gerado dos controles
<div style={containerStyle(containerLayout)}>
  {children.map((child) => (
    <div style={itemStyle(child.itemLayout, containerLayout)}>
      {render(child)}
    </div>
  ))}
</div>
```

---

Quer que eu te entregue um **painel de propriedades** já pronto (Solid) com esses controles e os mapeamentos plugados nos seus `props` atuais?
