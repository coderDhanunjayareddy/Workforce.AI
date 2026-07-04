import { mockApi } from "@/mocks/mockApi";
import { employees } from "@/mocks/mockData";
import type { Employee } from "@/types";

export const employeeService = {
  getEmployees: () => mockApi<Employee[]>(() => employees),
  getEmployee: (id: string) =>
    mockApi<Employee>(() => {
      const employee = employees.find((item) => item.id === id);
      if (!employee) throw new Error("AI Employee was not found.");
      return employee;
    }),
  hireEmployee: (employee: Employee) => mockApi<Employee>(() => employee),
  updateEmployee: (id: string, updates: Partial<Employee>) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, ...updates })),
  pauseEmployee: (id: string) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, status: "paused" })),
  resumeEmployee: (id: string) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, status: "active" })),
  archiveEmployee: (id: string) =>
    mockApi<Employee>(() => ({ ...employees.find((item) => item.id === id)!, status: "archived" })),
  deleteEmployee: (id: string) => mockApi(() => ({ id, deleted: true }))
};
