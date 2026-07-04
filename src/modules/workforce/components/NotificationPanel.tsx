import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { AppNotification } from "@/types";
import { formatRelativeTime } from "@/utils/date";

const typeTone = {
  info: "blue",
  success: "green",
  warning: "amber",
  error: "red"
} as const;

export function NotificationPanel({ notifications }: { notifications: AppNotification[] }) {
  const unread = notifications.filter((notification) => !notification.read).length;

  return (
    <Card>
      <CardHeader
        title="Notifications"
        description="Operational updates requiring awareness or action."
        action={unread ? <Badge tone="red">{unread} unread</Badge> : <Badge tone="teal">All read</Badge>}
      />
      <CardContent className="space-y-3">
        {notifications.slice(0, 6).map((notification) => (
          <Link key={notification.id} to={notification.href} className="flex gap-3 rounded-[16px] bg-[var(--surface-elevated)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
            <span className="mt-0.5 rounded-[12px] bg-blue-50 p-2 text-[var(--secondary)] dark:bg-blue-950">
              <Bell className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold">{notification.title}</span>
                <Badge tone={typeTone[notification.type]}>{notification.type}</Badge>
              </span>
              <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{notification.description}</span>
              <span className="mt-2 block text-xs text-[var(--text-muted)]">{formatRelativeTime(notification.createdAt)}</span>
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
