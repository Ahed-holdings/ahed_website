/**
 * All routes, shared by the browser app (src/app.jsx) and the build-time pre-renderer (src/entry-server.jsx).
 * Every real page is pre-rendered to its own HTML file at build time (scripts/prerender.mjs); unknown URLs get the
 * 404 page with a real 404 status. Add new pages here AND to the page list in src/lib/pages.js.
 */
import { RootLayout } from "@/components/layout/root-layout";

/**
 * Each page is its own JavaScript file, loaded only when that page is visited (performance: the home page no longer
 * downloads every other page's code). The build-time renderer and the browser both load it before rendering, so
 * the pre-rendered HTML and the live page match (see src/main.jsx).
 */
const page = (load) => async () => ({ Component: (await load()).default });

export const routes = [
  {
    element: <RootLayout />,
    children: [
      { index: true, lazy: page(() => import("@/pages/home")) },
      { path: "about", lazy: page(() => import("@/pages/about")) },
      { path: "services", lazy: page(() => import("@/pages/services")) },
      { path: "services/:slug", lazy: page(() => import("@/pages/service-detail")) },
      { path: "how-we-work", lazy: page(() => import("@/pages/how-we-work")) },
      { path: "industries", lazy: page(() => import("@/pages/industries")) },
      { path: "insights", lazy: page(() => import("@/pages/insights")) },
      { path: "contact", lazy: page(() => import("@/pages/contact")) },
      { path: "*", lazy: page(() => import("@/pages/not-found")) },
    ],
  },
];
