import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { notifications as mockNotifications } from "@/mocks/mockData";
import type { AppNotification } from "@/types";

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
      markRead: (id: string) =>
        setNotifications((items) =>
          items.map((item) => (item.id === id ? { ...item, read: true } : item))
        )
    }),
    [notifications]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used inside NotificationProvider.");
  return context;
}
