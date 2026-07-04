import { Link } from "@tanstack/react-router";
import { RotateCcw, Upload } from "lucide-react";

import { ErrorState, LoadingState, PageHeader } from "@/components/shared";
import { Badge, Button, Card, CardContent, CardHeader, Table } from "@/components/ui";
import { useKnowledgeVersions } from "@/hooks";

export function KnowledgeVersionsPage() {
  const versionsQuery = useKnowledgeVersions();

  if (versionsQuery.isLoading) return <LoadingState label="Loading knowledge versions" />;
  if (versionsQuery.isError || !versionsQuery.data) {
    return <ErrorState title="Knowledge versions could not be loaded" description="Retry version loading or contact support if this repeats." onRetry={() => void versionsQuery.refetch()} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Versions"
        title="Version Management"
        description="Preview, compare, restore and replace knowledge versions across Nova Insurance."
        actions={<Link to="/app/knowledge" className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]">Knowledge Center</Link>}
      />
      <Card>
        <CardHeader title="Version Timeline" description="Published versions and business impact." />
        <CardContent>
          <Table>
            <thead>
              <tr className="border-b border-[var(--border)] text-xs uppercase tracking-normal text-[var(--text-muted)]">
                <th className="p-3">Version</th>
                <th className="p-3">Published</th>
                <th className="p-3">Changes</th>
                <th className="p-3">Author</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {versionsQuery.data.map((version) => (
                <tr key={version.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="p-3 font-semibold">{version.version}</td>
                  <td className="p-3">{version.published}</td>
                  <td className="p-3">{version.changes}</td>
                  <td className="p-3">{version.author}</td>
                  <td className="p-3"><Badge tone={version.status === "current" ? "green" : "blue"}>{version.status}</Badge></td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" size="sm">Preview</Button>
                      <Button variant="secondary" size="sm">Compare</Button>
                      <Button variant="ghost" size="sm"><RotateCcw className="h-4 w-4" /> Restore</Button>
                      <Button variant="ghost" size="sm"><Upload className="h-4 w-4" /> Replace</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
