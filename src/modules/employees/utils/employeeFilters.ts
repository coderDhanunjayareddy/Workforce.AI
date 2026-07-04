import type { Employee } from "@/types";

import type { EmployeeDirectoryStats, EmployeeFilters, EmployeeHealthSummary, EmployeePerformanceSummary } from "../types/employeeModule.types";

const matchesText = (value: string | undefined, search: string) =>
  value?.toLowerCase().includes(search.toLowerCase()) ?? false;

const matchesHealth = (value: number, filter: EmployeeFilters["health"]) => {
  if (filter === "excellent") return value >= 95;
  if (filter === "good") return value >= 90 && value < 95;
  if (filter === "attention") return value < 90;
  return true;
};

const matchesPerformance = (value: number, filter: EmployeeFilters["performance"]) => {
  if (filter === "excellent") return value >= 97;
  if (filter === "strong") return value >= 93 && value < 97;
  if (filter === "improving") return value < 93;
  return true;
};

export function getFilteredEmployees(employees: Employee[], filters: EmployeeFilters) {
  const filtered = employees.filter((employee) => {
    const search = filters.search.trim();
    const searchMatch =
      !search ||
      matchesText(employee.name, search) ||
      matchesText(employee.department, search) ||
      matchesText(employee.currentCampaign, search) ||
      matchesText(employee.role, search) ||
      matchesText(employee.voice, search);

    return (
      searchMatch &&
      (filters.department === "all" || employee.department === filters.department) &&
      (filters.role === "all" || employee.role === filters.role) &&
      (filters.status === "all" || employee.status === filters.status) &&
      (filters.voice === "all" || employee.voice === filters.voice) &&
      (filters.language === "all" || employee.language === filters.language) &&
      matchesHealth(employee.health, filters.health) &&
      matchesPerformance(employee.performance, filters.performance)
    );
  });

  return filtered.sort((first, second) => {
    if (filters.sort === "name") return first.name.localeCompare(second.name);
    if (filters.sort === "health") return second.health - first.health;
    if (filters.sort === "calls") return second.callsToday - first.callsToday;
    if (filters.sort === "appointments") return second.appointmentsToday - first.appointmentsToday;
    if (filters.sort === "lastActive") return new Date(second.lastActive).getTime() - new Date(first.lastActive).getTime();
    if (filters.sort === "newest") return second.id.localeCompare(first.id);
    if (filters.sort === "oldest") return first.id.localeCompare(second.id);
    return second.performance - first.performance;
  });
}

export function getEmployeeStats(employees: Employee[]): EmployeeDirectoryStats {
  const averageHealth = employees.length
    ? Math.round(employees.reduce((total, employee) => total + employee.health, 0) / employees.length)
    : 0;

  return {
    total: employees.length,
    active: employees.filter((employee) => employee.status === "active" || employee.status === "busy").length,
    training: employees.filter((employee) => employee.status === "training").length,
    paused: employees.filter((employee) => employee.status === "paused").length,
    averageHealth,
    appointmentsToday: employees.reduce((total, employee) => total + employee.appointmentsToday, 0)
  };
}

export function getEmployeeHealthSummary(employee: Employee): EmployeeHealthSummary {
  return {
    overall: employee.health,
    knowledge: employee.knowledgeScore,
    voice: Math.min(100, employee.health + 1),
    conversationQuality: Math.min(100, employee.performance),
    policyCompliance: Math.max(90, employee.health - 1),
    toolConnectivity: 100,
    trend: employee.health >= 96 ? "+4% this month" : "+2% this month"
  };
}

export function getEmployeePerformanceSummary(employee: Employee): EmployeePerformanceSummary {
  return {
    callsToday: employee.callsToday,
    callsThisMonth: employee.callsToday * 21,
    appointments: employee.appointmentsToday,
    averageDuration: employee.department === "Claims" ? "6m 12s" : "4m 28s",
    successRate: Math.min(99, employee.performance),
    customerSatisfaction: employee.csat,
    revenueInfluenced: `Rs. ${(employee.performance * 18500).toLocaleString("en-IN")}`
  };
}
