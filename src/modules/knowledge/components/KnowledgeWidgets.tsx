import { Link } from "@tanstack/react-router";
import { ArrowRight, GitBranch, Loader2 } from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import type { KnowledgeActivityItem, KnowledgeCollection, KnowledgeQueueItem, KnowledgeRecommendation } from "@/types";

const priorityTone = {
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "teal"
} as const;

export function KnowledgeCollectionsPanel({ collections }: { collections: KnowledgeCollection[] }) {
  return (
    <Card>
      <CardHeader title="Knowledge Collections" description="Organized business domains powering the workforce." />
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {collections.slice(0, 8).map((collection) => (
          <Link key={collection.id} to="/app/knowledge/categories" className="rounded-[16px] bg-[var(--surface-elevated)] p-4 hover:shadow-sm">
            <span className="block font-display text-base font-semibold">{collection.name}</span>
            <span className="mt-1 block text-sm text-[var(--text-secondary)]">{collection.documents} sources - {collection.employeesAssigned} employees</span>
            <span className="mt-3 block h-2 rounded-full bg-[var(--border)]">
              <span className="block h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${collection.freshness}%` }} />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function ProcessingQueuePanel({ queue }: { queue: KnowledgeQueueItem[] }) {
  return (
    <Card>
      <CardHeader title="Processing Queue" description="Upload, scan, OCR, chunk, embed, index and quality checks." />
      <CardContent className="space-y-3">
        {queue.map((item) => (
          <div key={item.id} className="rounded-[16px] bg-[var(--surface-elevated)] p-4">
            <div className="flex items-start justify-between gap-3">
              <span>
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-1 block text-sm text-[var(--text-secondary)]">{item.stage} - ETA {item.eta}</span>
              </span>
              <Loader2 className="h-5 w-5 animate-spin text-[var(--ai-accent)]" aria-hidden="true" />
            </div>
            <div className="mt-3 h-2 rounded-full bg-[var(--border)]">
              <div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function KnowledgeRecommendations({ recommendations }: { recommendations: KnowledgeRecommendation[] }) {
  return (
    <Card>
      <CardHeader title="AI Recommendations" description="Actionable knowledge improvements ranked by business impact." />
      <CardContent className="space-y-3">
        {recommendations.map((item) => (
          <Link key={item.id} to={item.href} className="block rounded-[16px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 hover:shadow-sm">
            <Badge tone={priorityTone[item.priority]}>{item.priority}</Badge>
            <h3 className="mt-3 font-display text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.impact}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)]">
              {item.action}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function KnowledgeActivityFeed({ activity }: { activity: KnowledgeActivityItem[] }) {
  return (
    <Card>
      <CardHeader title="Activity Feed" description="Recent knowledge changes and employee training events." />
      <CardContent className="space-y-3">
        {activity.map((item) => (
          <Link key={item.id} to={item.href} className="grid grid-cols-[52px_1fr] gap-3 rounded-[16px] p-3 hover:bg-[var(--surface-elevated)]">
            <span className="text-sm font-semibold text-[var(--text-muted)]">{item.time}</span>
            <span className="border-l border-[var(--border)] pl-4">
              <span className="block text-sm font-semibold">{item.title}</span>
              <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">{item.description}</span>
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function KnowledgeMap({ collections }: { collections: KnowledgeCollection[] }) {
  return (
    <Card>
      <CardHeader title="Knowledge Map" description="Relationships between collections, domains and assigned employees." />
      <CardContent className="space-y-3">
        {collections.slice(0, 6).map((collection) => (
          <div key={collection.id} className="flex items-center justify-between gap-3 rounded-[16px] bg-[var(--surface-elevated)] p-4">
            <span className="flex items-center gap-3">
              <GitBranch className="h-5 w-5 text-[var(--ai-accent)]" aria-hidden="true" />
              <span>
                <span className="block font-semibold">{collection.name}</span>
                <span className="text-sm text-[var(--text-secondary)]">{collection.department} domain</span>
              </span>
            </span>
            <span className="text-right text-sm font-semibold">{collection.freshness}% fresh</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
