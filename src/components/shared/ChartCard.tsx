import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui";

export function ChartCard({ title, description, children, summary }: { title: string; description: string; children: ReactNode; summary: string }) {
  return (
    <Card>
      <CardHeader title={title} description={description} />
      <CardContent>
        {children}
        <p className="mt-4 rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm text-[var(--text-secondary)]">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}
