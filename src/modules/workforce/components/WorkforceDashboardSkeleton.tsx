import { Card, CardContent, Skeleton } from "@/components/ui";

export function WorkforceDashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading workforce dashboard">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-10 rounded-[12px]" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <Skeleton className="h-96 rounded-[20px]" />
        <Skeleton className="h-96 rounded-[20px]" />
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <Skeleton className="h-80 rounded-[20px]" />
        <Skeleton className="h-80 rounded-[20px]" />
        <Skeleton className="h-80 rounded-[20px]" />
      </section>
    </div>
  );
}
