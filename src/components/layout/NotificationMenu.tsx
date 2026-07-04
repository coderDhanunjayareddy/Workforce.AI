import { Bell } from "lucide-react";

import { Button, Dropdown } from "@/components/ui";
import { useNotifications } from "@/providers/NotificationProvider";

export function NotificationMenu() {
  const { notifications, unreadCount, markRead } = useNotifications();
  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon" aria-label={`${unreadCount} unread notifications`} className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--danger)]" /> : null}
        </Button>
      }
    >
      <div className="max-h-96 w-80 overflow-auto">
        {notifications.map((item) => (
          <button
            key={item.id}
            className="block w-full rounded-[12px] p-3 text-left hover:bg-[var(--surface-elevated)]"
            onClick={() => markRead(item.id)}
            type="button"
          >
            <span className="block text-sm font-semibold">{item.title}</span>
            <span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">{item.description}</span>
          </button>
        ))}
      </div>
    </Dropdown>
  );
}
