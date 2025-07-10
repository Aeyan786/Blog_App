import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Prisma } from "@/lib/prisma";

const TopArticles = async () => {
  const articles = await Prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((e, i) => {
        return (
          <Card
            key={i}
            className="group relative overflow-hidden transition-all hover:scale-[1.02] border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          >
            <div className="px-6">
              <Link href={`/articles/${e.id}`}>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={e.featuredImage}
                    alt="article"
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={e.author.imageUrl || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{e.author.name}</span>
                </div>
                <h3 className="mt-4 capitalize text-xl font-semibold text-gray-900 dark:text-white">
                  {e.title}
                </h3>
                <p className="mt-2 capitalize text-sm text-muted-foreground">
                  {e.category}
                </p>
                <div className="mt-6 flex justify-between text-sm text-muted-foreground">
                  <span>{e.createdAt.toDateString()}</span>
                </div>
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TopArticles;
