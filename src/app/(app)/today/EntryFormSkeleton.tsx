import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EntryFormSkeleton() {
  return (
    <>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="py-3 px-4 flex gap-3 items-start">
              <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-0.5" />
              <Skeleton className="h-[60px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-muted/30">
        <CardContent className="py-3 px-4 flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-24" />
      </div>
    </>
  );
}
