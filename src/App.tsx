import type { Component } from "solid-js";
import { AppProviders } from "./app/providers/AppProviders";
import { AppRoutes } from "./app/routes/AppRoutes";

const App: Component = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);

export default App;
