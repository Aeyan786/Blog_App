"use server";

import { Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
    await Prisma.comment.deleteMany({
    where: { articleId },
  });
    await Prisma.like.deleteMany({
    where: { articleId },
  });
  await Prisma.article.delete({
    where: {
      id: articleId,
    },
  });
  revalidatePath('/dashboard')
};
