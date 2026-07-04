import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { routeLabels } from "@/constants/navigation";

export function Breadcrumbs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const segments = pathname.split("/").filter(Boolean);
  const paths = segments.map((_, index) => `/${segments.slice(0, index + 1).join("/")}`);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
      <Link to="/app" className="font-medium hover:text-[var(--text-primary)]">
        Workforce AI
      </Link>
      {paths.map((path) => (
        <span key={path} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link to={path} className="font-medium hover:text-[var(--text-primary)]">
            {routeLabels[path] ?? path.split("/").pop()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
