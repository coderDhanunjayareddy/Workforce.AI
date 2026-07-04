import type { ReactNode } from "react";

import { NotificationProvider } from "./NotificationProvider";
import { OrganizationProvider } from "./OrganizationProvider";
import { QueryProvider } from "./QueryProvider";
import { SessionProvider } from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SessionProvider>
          <OrganizationProvider>
            <NotificationProvider>
              {children}
              <ToastProvider />
            </NotificationProvider>
          </OrganizationProvider>
        </SessionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
