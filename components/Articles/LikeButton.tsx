"use client";
import React, {  useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { LikeDislike } from "@/actions/like-dislike";
import { Like } from "@prisma/client";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
}) => {
  const [optimisticLike, setOptimisticLike] = useState(likes.length);

  const [isPending, startTransition] = useTransition();

  const handleLikeDislike = async () => {
    startTransition(async () => {
      setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1);
      await LikeDislike(articleId);
    });
  };
  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <form action={handleLikeDislike}>
        <Button disabled={isPending} type="submit" className="gap-2" variant={"ghost"}>
          <ThumbsUp className={`h-5 w-5 ${!isLiked? "" :"fill-blue-500 text-blue-500"}`} />
          {optimisticLike}
        </Button>
      </form>
      <Button className="gap-2" variant={"ghost"}>
        <Bookmark className="h-5 w-5" />
      </Button>
      <Button className="gap-2" variant={"ghost"}>
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default LikeButton;
