import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Avatar, Badge, Card, CardContent, CardHeader, Table } from "@/components/ui";
import type { Employee } from "@/types";

export function TopPerformersTable({ employees }: { employees: Employee[] }) {
  const performers = [...employees]
    .sort((first, second) => second.performance - first.performance || second.health - first.health)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader title="Top Performers" description="AI Employees creating the strongest business outcomes today." />
      <CardContent>
        <Table>
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]">
              <th className="p-3">Rank</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Calls</th>
              <th className="p-3">Appointments</th>
              <th className="p-3">CSAT</th>
              <th className="p-3">Health</th>
              <th className="p-3">Workspace</th>
            </tr>
          </thead>
          <tbody>
            {performers.map((employee, index) => (
              <tr key={employee.id} className="border-b border-[var(--border)] last:border-0">
                <td className="p-3 font-semibold">{index + 1}</td>
                <td className="min-w-56 p-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={employee.name} className="h-9 w-9" />
                    <span>
                      <span className="block font-semibold">{employee.name}</span>
                      <span className="block text-xs text-[var(--text-secondary)]">{employee.role}</span>
                    </span>
                  </div>
                </td>
                <td className="p-3">{employee.callsToday}</td>
                <td className="p-3">{employee.appointmentsToday}</td>
                <td className="p-3">{employee.csat}%</td>
                <td className="p-3">
                  <Badge tone="teal">{employee.health}%</Badge>
                </td>
                <td className="p-3">
                  <Link
                    to="/app/employees/$employeeId"
                    params={{ employeeId: employee.id }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)] hover:underline"
                  >
                    Open
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardContent>
    </Card>
  );
}
