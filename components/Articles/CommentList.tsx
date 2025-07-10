import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Prisma } from "@/lib/prisma";

type commentListprops = {
  articleId: string;
};

const CommentList: React.FC<commentListprops> = async ({ articleId }) => {
  const comments = await Prisma.comment.findMany({
    where: {
      articleId: articleId,
    },
    include: {
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
    <div className="space-y-8">
      {comments.map((e, i) => {
        return (
          <div key={i} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={e.author.imageUrl || ""} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-2">
                <span className="font-medium ">{e.author.name}</span>
                <span className="text-sm ml-2">
                  {e.createdAt.toDateString()}
                </span>
              </div>
              <p>{e.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
