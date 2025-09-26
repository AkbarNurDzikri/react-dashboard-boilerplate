import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryProvider } from "./providers/query-providers.tsx";
import { Toaster } from "sonner";
import { routeTree } from "./routeTree.gen.ts";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { UserProvider } from "./contexts/UserContext.tsx";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <UserProvider>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} position="top-right" />
      </UserProvider>
      <Toaster />
    </QueryProvider>
  </StrictMode>
);
