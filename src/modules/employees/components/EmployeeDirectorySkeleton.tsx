import { Card, CardContent, Skeleton } from "@/components/ui";

export function EmployeeDirectorySkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading AI Workforce">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-10 rounded-[12px]" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </section>
      <Skeleton className="h-36 rounded-[20px]" />
      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-96 rounded-[20px]" />
        ))}
      </section>
    </div>
  );
}
