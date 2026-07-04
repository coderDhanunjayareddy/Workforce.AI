import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui";

export function QuickActionCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-sm">
      <CardContent className="flex items-start gap-3">
        <span className="rounded-[12px] bg-blue-50 p-2 text-[var(--secondary)] dark:bg-blue-950">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold">{title}</span>
          <span className="mt-1 block text-sm text-[var(--text-secondary)]">{description}</span>
        </span>
      </CardContent>
    </Card>
  );
}
