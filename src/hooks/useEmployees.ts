import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { employeeService } from "@/services";
import type { Employee } from "@/types";

export const employeeKeys = {
  all: ["employees"] as const,
  detail: (id: string) => ["employee", id] as const,
  workspace: (id: string) => ["employee", id, "workspace"] as const,
  performance: (id: string) => ["employee", id, "performance"] as const,
  health: (id: string) => ["employee", id, "health"] as const,
  timeline: (id: string) => ["employee", id, "timeline"] as const,
  knowledge: (id: string) => ["employee", id, "knowledge"] as const,
  training: (id: string) => ["employee", id, "training"] as const,
  versions: (id: string) => ["employee", id, "versions"] as const,
  conversations: (id: string) => ["employee", id, "conversations"] as const
};

export function useEmployees() {
  return useQuery({ queryKey: employeeKeys.all, queryFn: employeeService.getEmployees });
}

export function useEmployee(id: string) {
  return useQuery({ queryKey: employeeKeys.detail(id), queryFn: () => employeeService.getEmployee(id) });
}

export function useEmployeeWorkspace(id: string) {
  return useQuery({ queryKey: employeeKeys.workspace(id), queryFn: () => employeeService.getWorkspace(id), enabled: Boolean(id) });
}

export function useEmployeePerformance(id: string) {
  return useQuery({ queryKey: employeeKeys.performance(id), queryFn: () => employeeService.getPerformance(id), enabled: Boolean(id) });
}

export function useEmployeeHealthData(id: string) {
  return useQuery({ queryKey: employeeKeys.health(id), queryFn: () => employeeService.getHealth(id), enabled: Boolean(id) });
}

export function useEmployeeTimeline(id: string) {
  return useQuery({ queryKey: employeeKeys.timeline(id), queryFn: () => employeeService.getTimeline(id), enabled: Boolean(id) });
}

export function useEmployeeKnowledge(id: string) {
  return useQuery({ queryKey: employeeKeys.knowledge(id), queryFn: () => employeeService.getKnowledge(id), enabled: Boolean(id) });
}

export function useEmployeeTraining(id: string) {
  return useQuery({ queryKey: employeeKeys.training(id), queryFn: () => employeeService.getTraining(id), enabled: Boolean(id) });
}

export function useEmployeeVersions(id: string) {
  return useQuery({ queryKey: employeeKeys.versions(id), queryFn: () => employeeService.getVersions(), enabled: Boolean(id) });
}

export function useEmployeeConversations(id: string) {
  return useQuery({ queryKey: employeeKeys.conversations(id), queryFn: () => employeeService.getConversations(id), enabled: Boolean(id) });
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
