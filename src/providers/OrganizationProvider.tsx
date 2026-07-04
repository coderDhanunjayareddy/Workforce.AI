import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { organization as mockOrganization } from "@/mocks/mockData";
import type { Organization } from "@/types";

interface OrganizationContextValue {
  organization: Organization;
  setOrganization: (organization: Organization) => void;
}

const OrganizationContext = createContext<OrganizationContextValue | null>(null);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [organization, setOrganization] = useState(mockOrganization);
  const value = useMemo(() => ({ organization, setOrganization }), [organization]);
  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) throw new Error("useOrganization must be used inside OrganizationProvider.");
  return context;
}
