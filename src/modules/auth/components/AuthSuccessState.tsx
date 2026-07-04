import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui";

export function AuthSuccessState({ title, description, action }: { title: string; description: string; action: ReactNode }) {
  return (
    <Card>
      <CardContent className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--success)]" />
        <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
        <div className="mt-6">{action}</div>
      </CardContent>
    </Card>
  );
}
