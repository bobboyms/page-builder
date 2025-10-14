import type { Component, JSX } from "solid-js";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { IconClosedEyes, IconOpenEyes } from "../icons";

export type ColorPickerProps = {
  color: string;
  onChange: (value: string) => void;
};

/* Utils */
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeHex = (hex: string): string => {
  const value = hex.trim().replace(/^#/, "");
  if (value.length === 3) {
    const [r, g, b] = value.split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (value.length === 6) return `#${value.toLowerCase()}`;
  if (value.length === 8) return `#${value.slice(0, 6).toLowerCase()}`;
  return "#ffffff";
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const normalized = normalizeHex(hex).replace(/^#/, "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return { r: 255, g: 255, b: 255 };
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const parseColorValue = (value: string | undefined): { hex: string; alpha: number } => {
  if (!value) return { hex: "#ffffff", alpha: 1 };
  if (value.toLowerCase() === "transparent") return { hex: "#ffffff", alpha: 0 };

  const rgbaMatch = value.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+)\s*)?\)$/i
  );
  if (rgbaMatch) {
    const [, rs, gs, bs, a] = rgbaMatch;
    const r = clamp(parseInt(rs, 10), 0, 255);
    const g = clamp(parseInt(gs, 10), 0, 255);
    const b = clamp(parseInt(bs, 10), 0, 255);
    const alpha = clamp(a ? parseFloat(a) : 1, 0, 1);
    return { hex: rgbToHex(r, g, b), alpha };
  }

  const normalizedHex = normalizeHex(value);
  if (value.trim().replace(/^#/, "").length === 8) {
    const alpha = parseInt(value.trim().slice(-2), 16) / 255;
    return { hex: normalizedHex, alpha: clamp(alpha, 0, 1) };
  }
  return { hex: normalizedHex, alpha: 1 };
};

const toCssColor = (hex: string, alpha: number): string => {
  const a = clamp(alpha, 0, 1);
  if (a <= 0) return "transparent";
  if (a >= 1) return normalizeHex(hex);

  const { r, g, b } = hexToRgb(hex);
  const alphaHex = Math.round(a * 255).toString(16).padStart(2, "0").toLowerCase();
  return `${rgbToHex(r, g, b)}${alphaHex}`;
};

/* Component */
export const ColorPicker: Component<ColorPickerProps> = (props) => {
  const [open, setOpen] = createSignal(true);
  const [color, setColor] = createSignal("#ffffff");
  const [alpha, setAlpha] = createSignal(1);
  const [previousAlpha, setPreviousAlpha] = createSignal(1);

  // Fundo do slider (xadrez + gradiente da cor)
  const sliderBackground = createMemo<JSX.CSSProperties>(() => {
    const { r, g, b } = hexToRgb(color());
    const colorGradient = `linear-gradient(90deg, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
    return {
      "background-image": `linear-gradient(45deg, rgba(54, 56, 61, 0.35) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(54, 56, 61, 0.35) 75%), ${colorGradient}`,
      "background-size": "12px 12px, 12px 12px, 100% 100%",
      "background-position": "0 0, 6px 6px, 0 0",
    };
  });

  // Sync inicial com props.color
  createEffect(() => {
    const parsed = parseColorValue(props.color);
    setColor(parsed.hex);
    setAlpha(parsed.alpha);
    if (parsed.alpha > 0) {
      setPreviousAlpha(parsed.alpha);
      setOpen(true);
    } else {
      setOpen(false);
    }
  });

  const emitColor = (nextHex: string, nextAlpha: number) => {
    props.onChange(toCssColor(nextHex, nextAlpha));
  };

  const handleColorInput = (nextValue: string) => {
    const normalized = normalizeHex(nextValue);
    setColor(normalized);
    emitColor(normalized, alpha());
  };

  const handleAlphaInput = (rawValue: string) => {
    const numericValue = clamp(Number(rawValue), 0, 100) / 100;
    setAlpha(numericValue);
    if (numericValue > 0) {
      setPreviousAlpha(numericValue);
      setOpen(true);
    } else {
      setOpen(false);
    }
    emitColor(color(), numericValue);
  };

  const toggleOpen = () => {
    const nextOpen = !open();
    setOpen(nextOpen);
    if (nextOpen) {
      const restoredAlpha = previousAlpha() > 0 ? previousAlpha() : 1;
      setAlpha(restoredAlpha);
      emitColor(color(), restoredAlpha);
    } else {
      if (alpha() > 0) setPreviousAlpha(alpha());
      setAlpha(0);
      props.onChange("transparent");
    }
  };

  return (
    <div class="flex flex-1 min-w-0 flex-row items-center gap-2 p-1 bg-ps-gray-2 border border-ps-gray-3 rounded-md">
      {/* seletor de cor */}
      <Show when={open()}>
        <input
          class="w-6 h-6 rounded-sm border border-ps-gray-3 cursor-pointer"
          type="color"
          name="color"
          aria-label="Selecionar cor"
          value={color()}
          onInput={(e) => handleColorInput(e.currentTarget.value)}
        />
      </Show>

      <input
        type="text"
        inputmode="numeric"
        class="small-semibold min-w-0 flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-ps-gray/70"
        value={props.color}
        onInput={(e) => props.onChange(e.currentTarget.value)}
        disabled={!open()}
      />

      {/* slider de alpha */}
      <Show when={open()}>
        <div class="flex flex-1 min-w-0 items-center gap-2">
          <div class="relative flex-1 min-w-0 h-6">
            {/* trilho visual centralizado */}
            <div
              class="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 rounded-full border border-ps-gray-3"
              style={sliderBackground()}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(alpha() * 100)}
              onInput={(e) => handleAlphaInput(e.currentTarget.value)}
              disabled={!open()}
              aria-label="Opacidade"
              class="
                relative w-full h-6 appearance-none bg-transparent outline-none
                focus-visible:ring-2 focus-visible:ring-ps-indigo/60 focus-visible:ring-offset-2
                focus-visible:ring-offset-ps-gray-2 focus-visible:rounded-full
                disabled:cursor-not-allowed disabled:opacity-40

                /* TRACK */
                [&::-webkit-slider-runnable-track]:h-2
                [&::-webkit-slider-runnable-track]:bg-transparent
                [&::-webkit-slider-runnable-track]:border-none
                [&::-moz-range-track]:h-2
                [&::-moz-range-track]:bg-transparent
                [&::-moz-range-track]:border-0

                /* THUMB */
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-ps-white
                [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-ps-gray-3
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-out
                [&::-webkit-slider-thumb]:mt-[-4px]  /* centraliza o thumb no track (16px - 8px)/2 */

                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-ps-white
                [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-ps-gray-3
                [&::-moz-range-thumb]:shadow
              "
            />
          </div>

          {/* <span class="text-xs text-ps-gray/70 w-10 text-right tabular-nums">
            {Math.round(alpha() * 100)}%
          </span> */}
        </div>
      </Show>

      {/* toggle de visibilidade (transparente vs visível) */}
      <button
        type="button"
        aria-pressed={open() ? "true" : "false"}
        aria-label={open() ? "Esconder (tornar transparente)" : "Mostrar (restaurar opacidade)"}
        class="ml-auto inline-flex items-center justify-center rounded-md p-1 hover:bg-ps-gray-3/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ps-indigo/60"
        onClick={toggleOpen}
      >
        {open() ? <IconOpenEyes width={20} height={16} /> : <IconClosedEyes width={20} height={16} />}
      </button>
    </div>
  );
};

