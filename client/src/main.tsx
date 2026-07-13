import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then(m => ({ default: m.SpeedInsights })));

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Suspense fallback={null}><SpeedInsights /></Suspense>
  </>,
);
