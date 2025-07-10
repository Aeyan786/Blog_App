import type { Prisma } from "@/app/generated/prisma";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import LikeBUttonAction from "./LikeBUttonAction";

type articleDetailProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetails: React.FC<articleDetailProps> =  ({ article }) => {


  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full capitalize bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 capitalize">
              {article.title}
            </h1>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article.author.imageUrl || ""} />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="font-medium">
                  {article.createdAt.toDateString()}
                </p>
              </div>
            </div>
          </header>
          <section
            className="mb-12 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <LikeBUttonAction articleId={article.id} />
          <CommentInput articleId={article.id} />
          <CommentList articleId={article.id} />
        </article>
      </main>
    </div>
  );
};

export default ArticleDetails;
