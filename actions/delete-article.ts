"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
    await prisma.comment.deleteMany({
    where: { articleId },
  });
    await prisma.like.deleteMany({
    where: { articleId },
  });
  await prisma.article.delete({
    where: {
      id: articleId,
    },
  });
  revalidatePath('/dashboard')
};
