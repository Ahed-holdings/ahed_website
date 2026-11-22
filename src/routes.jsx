/**
 * All routes, shared by the browser app (src/app.jsx) and the build-time pre-renderer (src/entry-server.jsx).
 * Every real page is pre-rendered to its own HTML file at build time (scripts/prerender.mjs); unknown URLs get the
 * 404 page with a real 404 status. Add new pages here AND to the page list in src/lib/pages.js.
 */
import { RootLayout } from "@/components/layout/root-layout";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import HomePage from "@/pages/home";
import HowWeWorkPage from "@/pages/how-we-work";
import IndustriesPage from "@/pages/industries";
import InsightsPage from "@/pages/insights";
import NotFoundPage from "@/pages/not-found";
import ServicePage from "@/pages/service-detail";
import ServicesPage from "@/pages/services";

export const routes = [
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/:slug", element: <ServicePage /> },
      { path: "how-we-work", element: <HowWeWorkPage /> },
      { path: "industries", element: <IndustriesPage /> },
      { path: "insights", element: <InsightsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
