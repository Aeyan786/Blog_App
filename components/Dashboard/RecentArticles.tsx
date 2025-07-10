"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Prisma } from "@/app/generated/prisma";
import { deleteArticle } from "@/actions/delete-article";

type RecentArticlesProps = {
  articles: Prisma.ArticleGetPayload<{
    include: {
      comments: true;
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

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Recent Published Articles
        </CardTitle>
        <Link href="/dashboard/articles/all">
          <Button
            className="gap-1 text-muted-foreground hover:text-primary cursor-pointer"
            size="sm"
            variant="ghost"
          >
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      {!articles.length ? (
        <CardContent>Articles not found</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-[14px]">Title</TableHead>
                <TableHead className="font-medium text-[14px]">
                  Status
                </TableHead>
                <TableHead className="font-medium text-[14px]">
                  Comments
                </TableHead>
                <TableHead className="font-medium text-[14px]">Date</TableHead>
                <TableHead className="text-center font-medium text-[14px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {articles.slice(0,2).map((e, i) => {
                return (
                  <TableRow key={i} className="hover:bg-muted/40 transition">
                    <TableCell className="font-medium">{e.title}</TableCell>
                    <TableCell>
                      <Badge className="rounded-full bg-green-100 text-green-800 text-xs px-2 py-1">
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>{e.comments.length}</TableCell>
                    <TableCell>{e.createdAt.toDateString()}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2 ">
                        <Link href={`/dashboard/article/${e.id}/edit`}>
                          <Button variant="ghost" className="cursor-pointer" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <DeleteButton articleId={e.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type deleteButtonProps = {
  articleId: string;
};

export const DeleteButton: React.FC<deleteButtonProps> = ({ articleId }) => {
  const [isPending,startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          await deleteArticle(articleId);
        });
      }}
    >
      <Button
        type="submit"
        variant="ghost"
        disabled={isPending}
        size="sm"
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        {isPending ? "Loading..." : "Delete"}
      </Button>
    </form>
  );
};
