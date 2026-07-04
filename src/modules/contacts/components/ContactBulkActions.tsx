import { Archive, Download, FolderInput, Send, Tag, Trash2, UserRoundCheck, X } from "lucide-react";

import { Button, Card, CardContent } from "@/components/ui";

import { bulkActions } from "../constants/contact.constants";

const icons = [UserRoundCheck, Send, Download, Archive, Trash2, Tag, FolderInput];

export function ContactBulkActions({ count, onClear }: { count: number; onClear: () => void }) {
  if (count === 0) return null;

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{count} contacts selected</p>
        <div className="flex flex-wrap gap-2">
          {bulkActions.map((action, index) => {
            const Icon = icons[index];
            return (
              <Button key={action} variant={action === "Delete" ? "danger" : "secondary"} size="sm" type="button">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {action}
              </Button>
            );
          })}
          <Button variant="ghost" size="sm" type="button" onClick={onClear}>
            <X className="h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
