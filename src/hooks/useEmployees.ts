import { useQuery } from "@tanstack/react-query";

import { employeeService } from "@/services";

export const employeeKeys = {
  all: ["employees"] as const,
  detail: (id: string) => ["employee", id] as const
};

export function useEmployees() {
  return useQuery({ queryKey: employeeKeys.all, queryFn: employeeService.getEmployees });
}

export function useEmployee(id: string) {
  return useQuery({ queryKey: employeeKeys.detail(id), queryFn: () => employeeService.getEmployee(id) });
}
