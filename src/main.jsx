import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "./index.css";
import { App } from "./app";

// Scroll-reveal hiding only applies once JavaScript runs (index.css `html[data-js]`): the pre-rendered HTML stays
// readable without it. createRoot then replaces the pre-rendered markup with the live app.
document.documentElement.setAttribute("data-js", "");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
