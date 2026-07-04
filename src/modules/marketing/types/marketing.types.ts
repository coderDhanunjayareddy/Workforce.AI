import type { LucideIcon } from "lucide-react";

export interface MarketingLink {
  label: string;
  href: string;
}

export interface MarketingFeature {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface MarketingMetric {
  label: string;
  value: string;
  description: string;
}

export interface MarketingIndustry {
  title: string;
  challenge: string;
  outcome: string;
}

export interface MarketingFaq {
  question: string;
  answer: string;
}
