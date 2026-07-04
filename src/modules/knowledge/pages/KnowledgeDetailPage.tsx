import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Trash2, Upload, UsersRound } from "lucide-react";

import { ErrorState, HealthRing, LoadingState, PageHeader } from "@/components/shared";
import { Avatar, Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { useDocument } from "@/hooks";

const statusTone = {
  indexed: "green",
  processing: "blue",
  "needs-review": "amber",
  failed: "red"
} as const;

export function KnowledgeDetailPage() {
  const { knowledgeId } = useParams({ strict: false });
  const documentQuery = useDocument(knowledgeId ?? "");
  const document = documentQuery.data;

  if (documentQuery.isLoading) return <LoadingState label="Loading knowledge document" />;
  if (documentQuery.isError || !document) {
    return <ErrorState title="Knowledge document could not be loaded" description="The selected source was not available. Retry or return to Knowledge Center." onRetry={() => void documentQuery.refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Document Details"
        title={document.title}
        description={document.description}
        actions={
          <>
            <Link to="/app/knowledge" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><ArrowLeft className="h-4 w-4" /> Knowledge Center</Link>
            <Button variant="secondary"><Upload className="h-4 w-4" /> Replace</Button>
            <Button variant="secondary"><UsersRound className="h-4 w-4" /> Assign</Button>
            <Button variant="danger"><Trash2 className="h-4 w-4" /> Delete</Button>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Document Overview" description="Metadata, ownership and indexing status." action={<Badge tone={statusTone[document.status]}>{document.status}</Badge>} />
          <CardContent className="space-y-3">
            <Info label="Category" value={document.category} />
            <Info label="Department" value={document.department} />
            <Info label="Owner" value={document.owner} />
            <Info label="Version" value={document.version} />
            <Info label="Language" value={document.language} />
            <Info label="Indexed Date" value={document.indexedDate} />
            <div className="flex flex-wrap gap-2 pt-2">{document.tags.map((tag) => <Badge key={tag} tone="blue">{tag}</Badge>)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="AI Summary" description="Business-focused understanding generated from the source." />
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-[var(--text-secondary)]">{document.summary.purpose}</p>
            <Info label="Business Value" value={document.summary.businessValue} />
            <div>
              <p className="text-sm font-semibold">Key Topics</p>
              <div className="mt-2 flex flex-wrap gap-2">{document.summary.keyTopics.map((topic) => <Badge key={topic} tone="teal">{topic}</Badge>)}</div>
            </div>
            <Info label="Recommended Departments" value={document.summary.recommendedDepartments.join(", ")} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader title="Knowledge Quality" description="Coverage, freshness and confidence." />
          <CardContent>
            <HealthRing value={document.quality.overall} label="Knowledge Score" />
            <div className="mt-5 space-y-4">
              <Progress label="Coverage" value={document.quality.coverage} />
              <Progress label="Freshness" value={document.quality.freshness} />
              <Progress label="Completeness" value={document.quality.completeness} />
              <Progress label="Accuracy" value={document.quality.accuracy} />
              <Progress label="Readability" value={document.quality.readability} />
              <Progress label="Usage" value={document.quality.usage} />
              <Progress label="AI Confidence" value={document.quality.confidence} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Knowledge Usage" description="Business impact from this source." />
          <CardContent className="grid gap-3">
            <Metric label="Employees Using" value={String(document.usage.employeesUsing)} />
            <Metric label="Campaigns Using" value={String(document.usage.campaignsUsing)} />
            <Metric label="Conversations Referenced" value={String(document.usage.conversationsReferenced)} />
            <Metric label="Customer Questions Answered" value={String(document.usage.customerQuestionsAnswered)} />
            <Metric label="Appointments Generated" value={String(document.usage.appointmentsGenerated)} />
            <Metric label="Revenue Influenced" value={document.usage.revenueInfluenced} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Assigned Employees" description="Employees using this knowledge." />
          <CardContent className="space-y-3">
            {document.assignedEmployees.map((employee) => (
              <Link key={employee} to="/app/employees/$employeeId" params={{ employeeId: `emp_${employee.toLowerCase()}` }} className="flex items-center gap-3 rounded-[12px] bg-[var(--surface-elevated)] p-3 hover:shadow-sm">
                <Avatar name={employee} className="h-9 w-9" />
                <span className="font-semibold">{employee}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Version History" description="Preview, compare, restore or replace versions." action={<Link to="/app/knowledge/versions" className="text-sm font-semibold text-[var(--secondary)] hover:underline">Open Versions</Link>} />
          <CardContent className="space-y-3">
            {document.versions.map((version) => <Metric key={version.id} label={`${version.version} - ${version.status}`} value={`${version.changes} (${version.published})`} />)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Processing Log" description="Upload, scan, OCR, processing, chunking, embedding and indexing stages." />
          <CardContent className="space-y-3">
            {document.processingLog.map((item) => (
              <div key={item.id} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
                <div className="flex items-center justify-between"><span className="font-semibold">{item.title}</span><span className="text-sm text-[var(--text-secondary)]">{item.stage}</span></div>
                <div className="mt-3 h-2 rounded-full bg-[var(--border)]"><div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${item.progress}%` }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader title="Related Documents" description="Sources connected to the same business domain." />
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {document.relatedDocuments.map((title) => <div key={title} className="rounded-[16px] bg-[var(--surface-elevated)] p-4 font-semibold">{title}</div>)}
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-3 rounded-[12px] bg-[var(--surface-elevated)] p-3 text-sm"><span className="text-[var(--text-secondary)]">{label}</span><span className="text-right font-semibold">{value}</span></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[16px] bg-[var(--surface-elevated)] p-4"><p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-muted)]">{label}</p><p className="mt-2 font-semibold">{value}</p></div>;
}

function Progress({ label, value }: { label: string; value: number }) {
  return <div><div className="flex items-center justify-between text-sm"><span>{label}</span><span className="font-semibold">{value}%</span></div><div className="mt-2 h-2 rounded-full bg-[var(--border)]"><div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${value}%` }} /></div></div>;
}
