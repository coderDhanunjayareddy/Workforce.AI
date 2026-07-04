export type AuthMode = "login" | "register" | "forgot" | "reset" | "verify" | "invite";

export interface PasswordRule {
  label: string;
  valid: boolean;
}

export interface OnboardingData {
  organizationName: string;
  website: string;
  phone: string;
  country: string;
  timezone: string;
  industry: string;
  companySize: string;
  logoName: string;
  primaryColor: string;
  secondaryColor: string;
  language: string;
  businessHours: string;
  dateFormat: string;
  currency: string;
}
