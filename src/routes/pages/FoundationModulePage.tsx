import { Construction } from "lucide-react";

import { EmptyState, PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export function FoundationModulePage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Route Ready"
        title={title}
        description={description}
        actions={<Button>Primary Action</Button>}
      />
      <EmptyState
        title={`${title} foundation is ready`}
        description="The route, shell, tokens, providers, loading state, error state, empty state, and service boundaries are in place. The full business workflow belongs to its dedicated implementation phase."
        action={
          <Button variant="secondary">
            <Construction className="h-4 w-4" />
            Open Command Palette
          </Button>
        }
      />
    </div>
  );
}
