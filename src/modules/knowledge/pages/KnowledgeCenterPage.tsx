import { Link } from "@tanstack/react-router";
import { BookOpen, Database, FileCheck2, FolderKanban, HardDrive, RefreshCw, Upload } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, ErrorState, MetricCard, PageHeader } from "@/components/shared";
import { useKnowledge, useKnowledgeDashboard } from "@/hooks";

import { KnowledgeDocumentGrid, KnowledgeDocumentTable } from "../components/KnowledgeDocumentViews";
import { KnowledgeToolbar } from "../components/KnowledgeToolbar";
import {
  KnowledgeActivityFeed,
  KnowledgeCollectionsPanel,
  KnowledgeMap,
  KnowledgeRecommendations,
  ProcessingQueuePanel
} from "../components/KnowledgeWidgets";
import { defaultKnowledgeFilters } from "../constants/knowledge.constants";
import type { KnowledgeFilters, KnowledgeViewMode } from "../types/knowledgeModule.types";
import { getFilteredKnowledge } from "../utils/knowledgeFilters";

export function KnowledgeCenterPage() {
  const knowledgeQuery = useKnowledge();
  const dashboardQuery = useKnowledgeDashboard();
  const [view, setView] = useState<KnowledgeViewMode>("grid");
  const [filters, setFilters] = useState<KnowledgeFilters>(defaultKnowledgeFilters);
  const documents = useMemo(() => knowledgeQuery.data ?? [], [knowledgeQuery.data]);
  const filteredDocuments = useMemo(() => getFilteredKnowledge(documents, filters), [documents, filters]);
  const departments = useMemo(() => Array.from(new Set(documents.map((item) => item.department))).sort(), [documents]);

  const updateFilter = <TKey extends keyof KnowledgeFilters>(key: TKey, value: KnowledgeFilters[TKey]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  if (knowledgeQuery.isLoading || dashboardQuery.isLoading) {
    return <div className="space-y-6"><PageHeader title="Knowledge Center" description="Loading knowledge intelligence..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  }

  if (knowledgeQuery.isError || dashboardQuery.isError || !dashboardQuery.data) {
    return (
      <ErrorState
        title="Knowledge Center could not be loaded"
        description="Knowledge services did not finish loading. Retry or contact support if this repeats."
        onRetry={() => {
          void knowledgeQuery.refetch();
          void dashboardQuery.refetch();
        }}
      />
    );
  }

  const dashboard = dashboardQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Center"
        title="Knowledge Center"
        description="Centralize, organize and continuously improve the knowledge powering your AI Workforce."
        actions={
          <>
            <Link to="/app/knowledge/categories" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">
              <FolderKanban className="h-4 w-4" aria-hidden="true" />
              Create Collection
            </Link>
            <Link to="/app/knowledge/upload" className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]">
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload Knowledge
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard icon={BookOpen} label="Total Knowledge Sources" value={String(dashboard.stats.totalSources)} trend="+8 this month" subtitle="Documents, websites and FAQs" />
        <MetricCard icon={FileCheck2} label="Indexed" value={String(dashboard.stats.indexed)} trend="ready" subtitle="Available to AI Employees" />
        <MetricCard icon={RefreshCw} label="Processing" value={String(dashboard.stats.processing)} trend="active" subtitle="Current queue" />
        <MetricCard icon={Database} label="Requires Review" value={String(dashboard.stats.requiresReview)} trend="action" subtitle="Manager attention needed" />
        <MetricCard icon={FileCheck2} label="Knowledge Freshness" value={`${dashboard.stats.freshness}%`} trend="+3%" subtitle="Across all collections" />
        <MetricCard icon={HardDrive} label="Storage Used" value={dashboard.stats.storageUsed} trend="healthy" subtitle="Enterprise Pro workspace" />
      </section>

      <KnowledgeToolbar
        filters={filters}
        departments={departments}
        view={view}
        onViewChange={setView}
        onFilterChange={updateFilter}
        onReset={() => setFilters(defaultKnowledgeFilters)}
      />

      {filteredDocuments.length === 0 ? (
        <EmptyState
          title="Your knowledge library is empty."
          description="Upload company documents to train your AI Workforce."
          action={<Link to="/app/knowledge/upload" className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[var(--primary)] px-4 text-sm font-semibold text-white">Upload Knowledge</Link>}
        />
      ) : view === "grid" ? (
        <KnowledgeDocumentGrid documents={filteredDocuments} />
      ) : (
        <KnowledgeDocumentTable documents={filteredDocuments} />
      )}

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <KnowledgeCollectionsPanel collections={dashboard.collections} />
        <ProcessingQueuePanel queue={dashboard.processingQueue} />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <KnowledgeMap collections={dashboard.collections} />
        <KnowledgeRecommendations recommendations={dashboard.recommendations} />
        <KnowledgeActivityFeed activity={dashboard.activity} />
      </section>
    </div>
  );
}
