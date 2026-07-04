import { useMemo, useState } from "react";

import type { Employee } from "@/types";

import { defaultEmployeeFilters } from "../constants/employee.constants";
import type { EmployeeFilters } from "../types/employeeModule.types";
import { getEmployeeStats, getFilteredEmployees } from "../utils/employeeFilters";

export function useEmployeeFilters(employees: Employee[]) {
  const [filters, setFilters] = useState<EmployeeFilters>(defaultEmployeeFilters);
  const [page, setPage] = useState(1);

  const filteredEmployees = useMemo(() => getFilteredEmployees(employees, filters), [employees, filters]);
  const stats = useMemo(() => getEmployeeStats(employees), [employees]);

  const updateFilter = <TKey extends keyof EmployeeFilters>(key: TKey, value: EmployeeFilters[TKey]) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultEmployeeFilters);
    setPage(1);
  };

  return {
    filters,
    filteredEmployees,
    stats,
    page,
    setPage,
    updateFilter,
    resetFilters
  };
}
