import { useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ErrorState, LoadingState } from "@/components/shared";
import {
  useArchiveEmployee,
  useEmployee,
  useEmployeeConversations,
  useEmployeeHealthData,
  useEmployeeKnowledge,
  useEmployeePerformance,
  useEmployeeTimeline,
  useEmployeeTraining,
  useEmployeeVersions,
  useEmployeeWorkspace,
  usePauseEmployee,
  useResumeEmployee
} from "@/hooks";
import { cn } from "@/utils/cn";

import { EmployeeWorkspaceHeader } from "../components/workspace/EmployeeWorkspaceHeader";
import { EmployeeWorkspaceSidebar } from "../components/workspace/EmployeeWorkspaceSidebar";
import { WorkspaceDetailTabs } from "../components/workspace/WorkspaceDetailTabs";
import { WorkspaceOverviewTab } from "../components/workspace/WorkspaceOverviewTab";
import { workspaceTabs, type WorkspaceTabId } from "../constants/workspace.constants";

export function EmployeeWorkspacePage() {
  const { employeeId } = useParams({ strict: false });
  const id = employeeId ?? "";
  const [activeTab, setActiveTab] = useState<WorkspaceTabId>("overview");
  const employeeQuery = useEmployee(id);
  const workspaceQuery = useEmployeeWorkspace(id);
  const performanceQuery = useEmployeePerformance(id);
  const healthQuery = useEmployeeHealthData(id);
  const timelineQuery = useEmployeeTimeline(id);
  const knowledgeQuery = useEmployeeKnowledge(id);
  const conversationsQuery = useEmployeeConversations(id);
  const trainingQuery = useEmployeeTraining(id);
  const versionsQuery = useEmployeeVersions(id);
  const pauseEmployee = usePauseEmployee();
  const resumeEmployee = useResumeEmployee();
  const archiveEmployee = useArchiveEmployee();

  const queries = useMemo(
    () => [
      employeeQuery,
      workspaceQuery,
      performanceQuery,
      healthQuery,
      timelineQuery,
      knowledgeQuery,
      conversationsQuery,
      trainingQuery,
      versionsQuery
    ],
    [
      employeeQuery,
      workspaceQuery,
      performanceQuery,
      healthQuery,
      timelineQuery,
      knowledgeQuery,
      conversationsQuery,
      trainingQuery,
      versionsQuery
    ]
  );

  if (queries.some((query) => query.isLoading)) {
    return <LoadingState label="Loading Employee Workspace" />;
  }

  const employee = employeeQuery.data;
  const workspace = workspaceQuery.data;
  const performance = performanceQuery.data;
  const health = healthQuery.data;
  const timeline = timelineQuery.data ?? [];
  const knowledge = knowledgeQuery.data ?? [];
  const conversations = conversationsQuery.data ?? [];
  const training = trainingQuery.data ?? [];
  const versions = versionsQuery.data ?? [];

  if (queries.some((query) => query.isError) || !employee || !workspace || !performance || !health) {
    return (
      <ErrorState
        title="Employee Workspace could not be loaded"
        description="The workspace services did not finish loading. Retry, refresh, view logs, or contact support if this repeats."
        onRetry={() => {
          queries.forEach((query) => {
            void query.refetch();
          });
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <EmployeeWorkspaceHeader
        employee={employee}
        workspace={workspace}
        onPause={() => pauseEmployee.mutate(employee.id)}
        onResume={() => resumeEmployee.mutate(employee.id)}
        onArchive={() => archiveEmployee.mutate(employee.id)}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-6">
          <nav
            className="overflow-x-auto rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-2"
            aria-label="Employee workspace tabs"
          >
            <div className="flex min-w-max gap-1">
              {workspaceTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={cn(
                    "rounded-[12px] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-elevated)]",
                    activeTab === tab.id && "bg-[var(--surface-elevated)] text-[var(--text-primary)]"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {activeTab === "overview" ? (
            <WorkspaceOverviewTab
              employee={employee}
              workspace={workspace}
              performance={performance}
              health={health}
              timeline={timeline}
              knowledge={knowledge}
              conversations={conversations}
            />
          ) : (
            <WorkspaceDetailTabs
              activeTab={activeTab}
              employee={employee}
              workspace={workspace}
              performance={performance}
              health={health}
              knowledge={knowledge}
              conversations={conversations}
              training={training}
              versions={versions}
            />
          )}
        </main>

        <EmployeeWorkspaceSidebar
          employee={employee}
          workspace={workspace}
          health={health}
          performance={performance}
          onTabChange={(tab) => setActiveTab(tab as WorkspaceTabId)}
        />
      </section>
    </div>
  );
}
