"use client";
import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CreateComment } from "@/actions/create-comment";

type commentInputProps = {
  articleId: string;
};

const CommentInput: React.FC<commentInputProps> = ({ articleId }) => {
  const [formState, action, isPending] = useActionState(
    CreateComment.bind(null, articleId),
    { errors: {} }
  );

  return (
    <form action={action} className="mb-8">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input type="text" name="comment" placeholder="Add a comment..." />
          {formState.errors.comment && (
            <p className="text-red-600 text-sm">{formState.errors.comment}</p>
          )}
           {formState.errors.formError && (
          <p className="text-red-600 text-sm mt-2 border p-2 capitalize border-red-500 bg-red-100">
            {formState.errors.formError[0]}
          </p>
        )}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button disabled={isPending} className="cursor-pointer" type="submit">
          {isPending ? "Loading..." : "Comment"}
        </Button>
        </div>
       
    </form>
  );
};

export default CommentInput;
