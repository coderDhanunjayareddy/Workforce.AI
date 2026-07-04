import { Badge } from "@/components/ui";
import type { Status } from "@/types";

export function StatusBadge({ status }: { status: Status | string }) {
  const tone =
    status === "active" || status === "busy"
      ? "green"
      : status === "training"
        ? "blue"
        : status === "paused"
          ? "amber"
          : status === "offline"
            ? "red"
            : "slate";
  return <Badge tone={tone}>{status.replace("-", " ")}</Badge>;
}
