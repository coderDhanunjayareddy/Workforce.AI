import { Link } from "@tanstack/react-router";
import { ArrowLeft, Copy } from "lucide-react";

import { ErrorState, PageHeader } from "@/components/shared";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { useCampaignTemplates } from "@/hooks";

export function CampaignTemplatesPage() {
  const templatesQuery = useCampaignTemplates();
  if (templatesQuery.isLoading) return <div className="space-y-6"><PageHeader title="Campaign Templates" description="Loading campaign templates..." /><div className="h-96 rounded-[20px] bg-[var(--surface)]" /></div>;
  if (templatesQuery.isError) return <ErrorState title="Campaign Error" description="Template services did not finish loading. Retry or contact support if this repeats." onRetry={() => void templatesQuery.refetch()} />;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Campaigns" title="Campaign Templates" description="Import proven campaign templates for sales outreach, policy renewal, claims follow-up, lead qualification, customer satisfaction, recruitment and collections." actions={<Link to="/app/campaigns" className="inline-flex h-11 items-center gap-2 rounded-[12px] border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-elevated)]"><ArrowLeft className="h-4 w-4" />Campaigns</Link>} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(templatesQuery.data ?? []).map((template) => (
          <Card key={template.id} className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader title={template.name} description={template.description} action={<Badge tone="teal">{template.type}</Badge>} />
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--text-secondary)]">Recommended role: <span className="font-semibold text-[var(--text-primary)]">{template.recommendedEmployeeRole}</span></p>
              <p className="text-sm text-[var(--text-secondary)]">Estimated duration: <span className="font-semibold text-[var(--text-primary)]">{template.estimatedDuration}</span></p>
              <p className="text-sm text-[var(--text-secondary)]">{template.expectedOutcome}</p>
              <Link to="/app/campaigns/create" className="inline-flex h-10 items-center gap-2 rounded-[12px] bg-[var(--primary)] px-3 text-sm font-semibold text-white"><Copy className="h-4 w-4" />Use Template</Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
