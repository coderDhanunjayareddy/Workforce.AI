import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <Card>
      <CardContent className="grid place-items-center py-12 text-center">
        <div className="mb-5 h-16 w-16 rounded-[20px] border border-dashed border-[var(--muted-border)] bg-[var(--surface-elevated)]" />
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
        {action ? <div className="mt-5">{action}</div> : null}
      </CardContent>
    </Card>
  );
}
