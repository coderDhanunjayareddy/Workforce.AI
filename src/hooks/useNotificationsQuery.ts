import { useQuery } from "@tanstack/react-query";

import { notificationService } from "@/services";

export function useNotificationsQuery() {
  return useQuery({ queryKey: ["notifications"], queryFn: notificationService.getNotifications });
}
