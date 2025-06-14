import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-96 w-full rounded-lg" />

          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4 rounded-lg" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-20 rounded-lg" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
            <Skeleton className="h-4 w-4/6 rounded-lg" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>

          <Card>
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-6 w-1/3 rounded-lg" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20 rounded-lg" />
                  <Skeleton className="h-4 w-24 rounded-lg" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
