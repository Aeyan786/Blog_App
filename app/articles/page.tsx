import AllArticles from "@/components/Articles/AllArticles";
import ArticleSearch from "@/components/Articles/ArticleSearch";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchArticles } from "@/lib/query/fetchArticles";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

type AllArticlesPageParams = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const ITEMS_PER_PAGE = 3;

const AllArticlesPage: React.FC<AllArticlesPageParams> = async ({
  searchParams,
}) => {
  const searchText = (await searchParams).search || "";
  const currentPage = Number((await searchParams).page) || 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;
  const { articles, total } = await fetchArticles(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:text-5xl"></main>
      <div className="mb-12 space-y-6 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">All Articles</h1>
        <div className="mx-2">

        <ArticleSearch />
        </div>
      </div>
      <Suspense fallback={<ArticlePageSkeleton />}>
        <AllArticles articles={articles} />
      </Suspense>

      <div className="mt-12 flex justify-center gap-2 mb-10">
        <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
          <Button disabled={currentPage === 1} size={"sm"} variant={"ghost"}>
            <ArrowLeft />
            Prev
          </Button>
        </Link>
        {Array.from({ length: totalPages }).map((e, i) => (
          <Link key={i} href={`?search=${searchText}&page=${i + 1}`} passHref>
            <Button size={"sm"} variant={`${currentPage === i+1? "outline":"ghost"}`}>
              {i + 1}
            </Button>
          </Link>
        ))}

        <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
          <Button
            disabled={currentPage === totalPages}
            size={"sm"}
            variant={"ghost"}
          >
            Next
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AllArticlesPage;
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
