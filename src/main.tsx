import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { COLORS } from "../src/constants/colors.ts";

Object.entries(COLORS).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--color-${key}`, value);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
