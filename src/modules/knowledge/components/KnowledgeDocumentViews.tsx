import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, RefreshCw, Trash2, UsersRound } from "lucide-react";

import { Badge, Button, Card, CardContent, Table } from "@/components/ui";
import type { Knowledge } from "@/types";

import { getAssignedEmployeeCount, getKnowledgeOwner } from "../utils/knowledgeFilters";

const statusTone = {
  indexed: "green",
  processing: "blue",
  "needs-review": "amber",
  failed: "red"
} as const;

export function KnowledgeDocumentGrid({ documents }: { documents: Knowledge[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4" aria-label="Knowledge documents">
      {documents.map((document) => <KnowledgeDocumentCard key={document.id} document={document} />)}
    </section>
  );
}

export function KnowledgeDocumentCard({ document }: { document: Knowledge }) {
  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-sm">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-[12px] bg-teal-50 p-2 text-[var(--ai-accent)] dark:bg-teal-950">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <Badge tone={statusTone[document.status]}>{document.status}</Badge>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">{document.title}</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{document.department} collection - owned by {getKnowledgeOwner(document.department)}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Metric label="Type" value={document.type.toUpperCase()} />
          <Metric label="Version" value={document.version} />
          <Metric label="Score" value={`${document.freshness}%`} />
          <Metric label="Employees" value={String(getAssignedEmployeeCount(document.department))} />
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/app/knowledge/$knowledgeId" params={{ knowledgeId: document.id }} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-3 text-sm font-semibold hover:bg-[var(--surface-elevated)]">
            Open Details
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Button variant="ghost" size="icon" type="button" aria-label={`Assign ${document.title}`}>
            <UsersRound className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon" type="button" aria-label={`Replace ${document.title}`}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon" type="button" aria-label={`Delete ${document.title}`}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function KnowledgeDocumentTable({ documents }: { documents: Knowledge[] }) {
  return (
    <Card>
      <CardContent>
        <Table>
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Department</th>
              <th className="p-3">Version</th>
              <th className="p-3">Status</th>
              <th className="p-3">Freshness</th>
              <th className="p-3">Knowledge Score</th>
              <th className="p-3">Employees</th>
              <th className="p-3">Last Updated</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={document.id} className="border-b border-[var(--border)] last:border-0">
                <td className="min-w-56 p-3 font-semibold">{document.title}</td>
                <td className="p-3">{document.department}</td>
                <td className="p-3">{document.department}</td>
                <td className="p-3">{document.version}</td>
                <td className="p-3"><Badge tone={statusTone[document.status]}>{document.status}</Badge></td>
                <td className="p-3">{document.freshness}%</td>
                <td className="p-3">{Math.min(100, document.freshness + 1)}%</td>
                <td className="p-3">{getAssignedEmployeeCount(document.department)}</td>
                <td className="p-3">{index < 2 ? "Today" : `${index + 1} days ago`}</td>
                <td className="p-3">
                  <Link to="/app/knowledge/$knowledgeId" params={{ knowledgeId: document.id }} className="font-semibold text-[var(--secondary)] hover:underline">
                    Preview
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] bg-[var(--surface-elevated)] p-3">
      <dt className="text-xs text-[var(--text-secondary)]">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}
