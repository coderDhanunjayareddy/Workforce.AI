import { Link } from "@tanstack/react-router";
import { FolderKanban, Plus } from "lucide-react";

import { ErrorState, LoadingState, PageHeader } from "@/components/shared";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { useKnowledgeCollections } from "@/hooks";

export function KnowledgeCollectionsPage() {
  const collectionsQuery = useKnowledgeCollections();

  if (collectionsQuery.isLoading) return <LoadingState label="Loading knowledge collections" />;
  if (collectionsQuery.isError || !collectionsQuery.data) {
    return <ErrorState title="Collections could not be loaded" description="Retry collection loading or contact support if this repeats." onRetry={() => void collectionsQuery.refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Collections"
        title="Knowledge Collections"
        description="Organize documents into business domains that can be assigned to employees, departments or the entire workforce."
        actions={
          <>
            <Link to="/app/knowledge" className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">Knowledge Center</Link>
            <Button><Plus className="h-4 w-4" /> Create Collection</Button>
          </>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {collectionsQuery.data.map((collection) => (
          <Card key={collection.id}>
            <CardHeader title={collection.name} description={`${collection.department} business domain`} action={<FolderKanban className="h-5 w-5 text-[var(--ai-accent)]" />} />
            <CardContent>
              <dl className="grid gap-3 text-sm">
                <Info label="Documents" value={String(collection.documents)} />
                <Info label="Freshness" value={`${collection.freshness}%`} />
                <Info label="Employees Assigned" value={String(collection.employeesAssigned)} />
              </dl>
              <div className="mt-4 h-2 rounded-full bg-[var(--border)]"><div className="h-2 rounded-full bg-[var(--ai-accent)]" style={{ width: `${collection.freshness}%` }} /></div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between rounded-[12px] bg-[var(--surface-elevated)] p-3"><dt className="text-[var(--text-secondary)]">{label}</dt><dd className="font-semibold">{value}</dd></div>;
}
