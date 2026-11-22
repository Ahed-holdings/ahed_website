/**
 * Build-time render of one page to HTML (used by scripts/prerender.mjs, never shipped to the browser).
 * Built with `vite build --ssr src/entry-server.jsx` into dist-ssr/.
 */
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { takeServerMeta } from "@/components/layout/page-meta";
import { routes } from "./routes";

export async function render(path) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`https://prerender.local${path}`));
  const router = createStaticRouter(handler.dataRoutes, context);
  // hydrate={false}: no inline hydration-data script (the browser app starts fresh with createRoot)
  const html = renderToString(<StaticRouterProvider router={router} context={context} hydrate={false} />);
  return { html, meta: takeServerMeta() };
}

// Re-exported so the pre-render script reads the page list and site details through the same bundle
export { pages } from "@/lib/pages";
export { site } from "@/lib/site";
