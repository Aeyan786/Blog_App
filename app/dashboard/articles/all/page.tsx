import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { prisma } from "@/lib/prisma";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/Dashboard/RecentArticles";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId || "",
    },
  });
  const articles = await prisma.article.findMany({
    where: {
      authorId: user?.id || "",
    },
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
    <Card className="mt-8 mx-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold tracking-tight">
          All Published Articles
        </CardTitle>
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
              {articles.map((e:any, i:any) => {
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
                          <Button
                            variant="ghost"
                            className="cursor-pointer"
                            size="sm"
                          >
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

export default page;
