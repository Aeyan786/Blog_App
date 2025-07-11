import { Avatar } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

export const ArticlePageSkeleton = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 py-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card
          key={i}
          className="animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800"
        >
          <div className="px-6 pt-2">
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>

          <CardContent className="px-6 pb-6">
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-gray-300 dark:bg-gray-700" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};