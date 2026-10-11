import { Building2, ChevronDown } from "lucide-react";

import { Button, Dropdown } from "@/components/ui";
import { useOrganization } from "@/providers/OrganizationProvider";

export function OrganizationSwitcher() {
  const { organization } = useOrganization();
  return (
    <Dropdown
      trigger={
        <Button variant="secondary" className="max-w-[220px] justify-start px-3 sm:px-4" aria-label={`Organization: ${organization.name}`}>
          <Building2 className="h-4 w-4" />
          <span className="hidden truncate sm:inline">{organization.name}</span>
          <ChevronDown className="ml-auto hidden h-4 w-4 sm:block" />
        </Button>
      }
    >
      <div className="p-2">
        <p className="text-sm font-semibold">{organization.name}</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">{organization.subscription}</p>
      </div>
    </Dropdown>
  );
}
