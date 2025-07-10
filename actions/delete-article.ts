"use server";

import { Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  await Prisma.article.delete({
    where: {
      id: articleId,
    },
  });
  revalidatePath('/dashboard')
};
