import {
  BarChart3,
  BookOpen,
  Building2,
  ContactRound,
  Headphones,
  LayoutDashboard,
  Megaphone,
  Settings,
  UsersRound,
  LifeBuoy
} from "lucide-react";

export const appNavigation = [
  { label: "Overview", href: "/app", icon: LayoutDashboard },
  { label: "AI Workforce", href: "/app/workforce", icon: UsersRound },
  { label: "Knowledge", href: "/app/knowledge", icon: BookOpen },
  { label: "Contacts", href: "/app/contacts", icon: ContactRound },
  { label: "Campaigns", href: "/app/campaigns", icon: Megaphone },
  { label: "Conversations", href: "/app/conversations", icon: Headphones },
  { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
  { label: "Organization", href: "/app/organization", icon: Building2 },
  { label: "Settings", href: "/app/settings", icon: Settings },
  { label: "Support", href: "/app/support", icon: LifeBuoy }
] as const;

export const routeLabels: Record<string, string> = {
  "/": "Landing",
  "/features": "Features",
  "/solutions": "Solutions",
  "/pricing": "Pricing",
  "/about": "About",
  "/contact": "Contact",
  "/login": "Login",
  "/register": "Register",
  "/forgot-password": "Forgot Password",
  "/reset-password": "Reset Password",
  "/verify-email": "Verify Email",
  "/onboarding": "Onboarding",
  "/app": "Overview",
  "/app/workforce": "AI Workforce",
  "/app/employees": "AI Employees",
  "/app/employees/hire": "Hire AI Employee",
  "/app/knowledge": "Knowledge",
  "/app/contacts": "Contacts",
  "/app/campaigns": "Campaigns",
  "/app/conversations": "Conversations",
  "/app/analytics": "Analytics",
  "/app/settings": "Settings",
  "/app/organization": "Organization",
  "/app/support": "Support"
};
