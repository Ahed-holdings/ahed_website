import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "./index.css";
import { App, router } from "./app";

// Scroll-reveal hiding only applies once JavaScript runs (index.css `html[data-js]`): the pre-rendered HTML stays
// readable without it.
document.documentElement.setAttribute("data-js", "");

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

/*
 * Performance: on the built site every page arrives pre-rendered (scripts/prerender.mjs), so React *hydrates* it,
 * attaching to the HTML already on screen instead of throwing it away and drawing it again. Pages are loaded on demand
 * (src/routes.jsx), so wait until the current page's code is in before hydrating, or the first render wouldn't match.
 * In `npm run dev` the container is empty and the app simply renders.
 */
function start() {
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
if (router.state.initialized) start();
else {
  const stop = router.subscribe((state) => {
    if (!state.initialized) return;
    stop();
    start();
  });
}
