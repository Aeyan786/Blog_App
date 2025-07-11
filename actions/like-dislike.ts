"use server";

import { Prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const LikeDislike = async (articleId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("you must have to login ");
  }

  const user = await Prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) {
    throw new Error("user does not exists");
  }

  const existingLike = await Prisma.like.findFirst({
    where: { articleId, userId: user.id },
  });
  if (existingLike) {
    await Prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await Prisma.like.create({
      data: {
        articleId,
        userId: user.id,
      },
    });
  }
  revalidatePath(`/artcles/${articleId}`);
  revalidatePath("/dashboard");
};
