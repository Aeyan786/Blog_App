import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search } from "lucide-react";
import Link from "next/link";
import type { Prisma } from "@/app/generated/prisma";

type AllArticleProps = {
  articles: Prisma.ArticleGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const AllArticles: React.FC<AllArticleProps> = async ({ articles }) => {
  if (!articles.length) {
    return <NoSearchResults />;
  }
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 py-8">
      {articles.map((e, i) => {
        return (
          <Card
            key={i}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800"
          >
            <Link href={`/articles/${e.id}`}>
              <div className="px-6 pt-2">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={e.featuredImage}
                    alt="article thumbnail"
                    className="object-cover w-full h-full rounded-xl transition-transform duration-300"
                    fill={false}
                    sizes="256px"
                    width={600}
                    height={200}
                  />
                </div>
              </div>

              <CardContent className="px-6 pb-6">
                <h3 className="text-lg capitalize mt-2 font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  {e.title}
                </h3>
                <p className="mt-1 capitalize text-sm text-gray-500 dark:text-gray-400">
                  {e.category}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={e.author.imageUrl || ""} />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {e.author.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {e.createdAt.toDateString()}
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default AllArticles;

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8" />
      </div>
      <h3 className="font-bold text-xl">No results found!</h3>
      <p className="mt-2">
        Oops! The article you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
};
