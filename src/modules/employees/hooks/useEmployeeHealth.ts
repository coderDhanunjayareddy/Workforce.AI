import { useMemo } from "react";

import type { Employee } from "@/types";

import { getEmployeeHealthSummary } from "../utils/employeeFilters";

export function useEmployeeHealth(employee: Employee | undefined) {
  return useMemo(() => (employee ? getEmployeeHealthSummary(employee) : undefined), [employee]);
}
