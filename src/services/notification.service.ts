import { mockApi } from "@/mocks/mockApi";
import { notifications } from "@/mocks/mockData";
import type { AppNotification } from "@/types";

export const notificationService = {
  getNotifications: () => mockApi<AppNotification[]>(() => notifications),
  markRead: (id: string) =>
    mockApi<AppNotification[]>(() =>
      notifications.map((item) => (item.id === id ? { ...item, read: true } : item))
    )
};
