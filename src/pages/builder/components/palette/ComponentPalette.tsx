import { Component } from "solid-js";
import { PaletteItem } from "./PaletteItem";

export const ComponentPalette: Component = () => (
  <aside class="w-48 hidden md:block p-2 border-r bg-ps-indigo text-white">
    <h2 class="text-lg font-semibold mb-4">Componentes</h2>
    <div class="space-y-2">
      <PaletteItem type="title" label="Título" />
      <PaletteItem type="text-input" label="Campo de Texto" />
      <PaletteItem type="container" label="Container" />
    </div>
  </aside>
);
