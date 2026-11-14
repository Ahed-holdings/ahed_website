import { createBrowserRouter, RouterProvider } from "react-router";
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

/** All routes. Netlify serves index.html for every URL (see netlify.toml), so these work on reload too. */
const router = createBrowserRouter([
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
]);

export function App() {
  return <RouterProvider router={router} />;
}
