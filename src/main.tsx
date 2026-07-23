import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { AppProviders } from "@/providers/AppProviders";
import { router } from "@/routes/router";
import { employeeAssetService } from "@/services/employeeAssetService";
import "@/styles/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Application root element was not found.");
}

employeeAssetService.preloadHeroEmployeeCoreAssets();

createRoot(root).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
