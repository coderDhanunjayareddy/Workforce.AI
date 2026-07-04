import { Archive, Megaphone, PauseCircle, PlayCircle, X } from "lucide-react";

import { Button } from "@/components/ui";

interface EmployeeBulkActionsProps {
  count: number;
  onPause: () => void;
  onResume: () => void;
  onArchive: () => void;
  onClear: () => void;
}

export function EmployeeBulkActions({ count, onPause, onResume, onArchive, onClear }: EmployeeBulkActionsProps) {
  if (count === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold">{count} AI Employees selected</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" type="button">
          <Megaphone className="h-4 w-4" aria-hidden="true" />
          Assign Campaign
        </Button>
        <Button variant="secondary" type="button" onClick={onPause}>
          <PauseCircle className="h-4 w-4" aria-hidden="true" />
          Pause
        </Button>
        <Button variant="secondary" type="button" onClick={onResume}>
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          Resume
        </Button>
        <Button variant="danger" type="button" onClick={onArchive}>
          <Archive className="h-4 w-4" aria-hidden="true" />
          Archive
        </Button>
        <Button variant="ghost" size="icon" type="button" aria-label="Clear selection" onClick={onClear}>
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
