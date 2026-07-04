import { PageHeader } from "@/components/shared";
import { Skeleton } from "@/components/ui";

export function ContactDirectorySkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading contacts">
      <PageHeader title="Contacts" description="Loading customer intelligence..." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-36" />)}
      </div>
      <Skeleton className="h-28" />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <Skeleton className="h-[520px]" />
        <Skeleton className="h-[520px]" />
      </div>
    </div>
  );
}

export function ContactProfileSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading contact profile">
      <Skeleton className="h-28" />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Skeleton className="h-[620px]" />
        <Skeleton className="h-[620px]" />
      </div>
    </div>
  );
}

export function ContactImportSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading contact import">
      <Skeleton className="h-24" />
      <Skeleton className="h-[520px]" />
    </div>
  );
}
