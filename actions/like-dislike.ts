"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const LikeDislike = async (articleId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("you must have to login ");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("user does not exists");
  }

  const existingLike = await prisma.like.findFirst({
    where: { articleId, userId: user.id },
  });
  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        articleId,
        userId: user.id,
      },
    });
  }
  revalidatePath(`/artcles/${articleId}`);
  revalidatePath("/dashboard");
};
