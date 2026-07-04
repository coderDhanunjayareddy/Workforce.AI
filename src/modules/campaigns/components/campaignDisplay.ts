import type { Campaign } from "@/types";

export function statusLabel(status: Campaign["status"]) {
  const labels: Record<Campaign["status"], string> = {
    draft: "Draft",
    scheduled: "Scheduled",
    running: "Running",
    paused: "Paused",
    completed: "Completed",
    cancelled: "Cancelled",
    archived: "Archived"
  };
  return labels[status];
}

export function statusTone(status: Campaign["status"]) {
  const tones: Record<Campaign["status"], "slate" | "blue" | "green" | "amber" | "red" | "teal"> = {
    draft: "slate",
    scheduled: "blue",
    running: "green",
    paused: "amber",
    completed: "teal",
    cancelled: "red",
    archived: "slate"
  };
  return tones[status];
}

export function formatRevenue(value: number) {
  if (value >= 100000) return `Rs. ${(value / 100000).toFixed(1)}L`;
  return `Rs. ${value.toLocaleString("en-IN")}`;
}
