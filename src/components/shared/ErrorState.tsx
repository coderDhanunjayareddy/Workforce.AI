import { RefreshCcw } from "lucide-react";

import { Button, Card, CardContent } from "@/components/ui";

export function ErrorState({ title, description, onRetry }: { title: string; description: string; onRetry?: () => void }) {
  return (
    <Card>
      <CardContent className="py-10 text-center">
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
        {onRetry ? (
          <Button className="mt-5" onClick={onRetry}>
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
