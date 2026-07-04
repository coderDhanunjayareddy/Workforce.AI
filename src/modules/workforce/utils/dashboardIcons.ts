import {
  Activity,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  Megaphone,
  PhoneCall,
  RefreshCw,
  Sparkles,
  Upload,
  UsersRound
} from "lucide-react";

import type { DashboardIcon } from "../types/workforceDashboard.types";

export const dashboardIcons = {
  activity: Activity,
  book: BookOpen,
  briefcase: BriefcaseBusiness,
  calendar: CalendarCheck,
  megaphone: Megaphone,
  phone: PhoneCall,
  refresh: RefreshCw,
  sparkles: Sparkles,
  upload: Upload,
  users: UsersRound
} satisfies Record<DashboardIcon, typeof Activity>;
