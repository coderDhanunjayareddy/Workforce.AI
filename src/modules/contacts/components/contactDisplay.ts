import type { Contact } from "@/types";

export function statusLabel(status: Contact["status"]) {
  const labels: Record<Contact["status"], string> = {
    "new-lead": "New Lead",
    qualified: "Qualified",
    customer: "Customer",
    "renewal-due": "Renewal Due",
    inactive: "Inactive",
    blacklisted: "Blacklisted",
    archived: "Archived"
  };
  return labels[status];
}

export function statusTone(status: Contact["status"]) {
  const tones: Record<Contact["status"], "slate" | "blue" | "green" | "amber" | "red" | "teal"> = {
    "new-lead": "blue",
    qualified: "teal",
    customer: "green",
    "renewal-due": "amber",
    inactive: "slate",
    blacklisted: "red",
    archived: "slate"
  };
  return tones[status];
}

export function scoreTone(score: number) {
  if (score >= 85) return "teal";
  if (score >= 70) return "green";
  if (score >= 50) return "amber";
  return "red";
}
