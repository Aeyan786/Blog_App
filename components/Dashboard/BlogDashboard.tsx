import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Clock, FileText, MessageCircle, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./RecentArticles";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const BlogDashboard = async () => {
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId || "",
    },
  });
  const [articles, totalComments] = await Promise.all([
    prisma.article.findMany({
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
    }),
    prisma.comment.count({
      where: {
        authorId:{
          not:user?.id || ""
        } 
      },
    }),
  ]);

  const likes = await prisma.like.count({
    where: {
      userId:{
        not: user?.id || "",
      }
    },
  });

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Blog Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your blogs and analytics
          </p>
        </div>
        <Link href="/dashboard/article/create" className="w-full md:w-auto">
          <Button className="w-full md:w-auto gap-2">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </Link>
      </div>
      {!articles.length ? (
        <div className="flex justify-center items-center h-64 text-center">
          <h1 className="text-xl text-muted-foreground">
            No articles found. Start writing now!
          </h1>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Total Articles
                </CardTitle>
                <FileText className="w-5 h-5 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{articles.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  From first to latest
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Total Comments
                </CardTitle>
                <MessageCircle className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalComments}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  All user feedback included
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Total Likes
                </CardTitle>
                <Clock className="w-5 h-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{likes}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Updated in real-time
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <RecentArticles articles={articles} />
          </div>
        </>
      )}
    </main>
  );
};

export default BlogDashboard;
