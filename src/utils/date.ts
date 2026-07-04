import { formatDistanceToNow } from "date-fns";

export const formatRelativeTime = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });
