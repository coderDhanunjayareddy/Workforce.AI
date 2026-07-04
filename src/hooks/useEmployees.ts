import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { employeeService } from "@/services";
import type { Employee } from "@/types";

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

function updateEmployeeCache(employees: Employee[] | undefined, updatedEmployee: Employee) {
  return (employees ?? []).map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee));
}

export function useHireEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeService.hireEmployee,
    onSuccess: (employee) => {
      queryClient.setQueryData<Employee[]>(employeeKeys.all, (employees = []) => [employee, ...employees]);
      queryClient.setQueryData(employeeKeys.detail(employee.id), employee);
    }
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Employee> }) => employeeService.updateEmployee(id, updates),
    onSuccess: (employee) => {
      queryClient.setQueryData<Employee[]>(employeeKeys.all, (employees) => updateEmployeeCache(employees, employee));
      queryClient.setQueryData(employeeKeys.detail(employee.id), employee);
    }
  });
}

export function usePauseEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeService.pauseEmployee,
    onSuccess: (employee) => {
      queryClient.setQueryData<Employee[]>(employeeKeys.all, (employees) => updateEmployeeCache(employees, employee));
      queryClient.setQueryData(employeeKeys.detail(employee.id), employee);
    }
  });
}

export function useResumeEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeService.resumeEmployee,
    onSuccess: (employee) => {
      queryClient.setQueryData<Employee[]>(employeeKeys.all, (employees) => updateEmployeeCache(employees, employee));
      queryClient.setQueryData(employeeKeys.detail(employee.id), employee);
    }
  });
}

export function useArchiveEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeService.archiveEmployee,
    onSuccess: (employee) => {
      queryClient.setQueryData<Employee[]>(employeeKeys.all, (employees) => updateEmployeeCache(employees, employee));
      queryClient.setQueryData(employeeKeys.detail(employee.id), employee);
    }
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeService.deleteEmployee,
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Employee[]>(employeeKeys.all, (employees = []) => employees.filter((employee) => employee.id !== id));
      queryClient.removeQueries({ queryKey: employeeKeys.detail(id) });
    }
  });
}
