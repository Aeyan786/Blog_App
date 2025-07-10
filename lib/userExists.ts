"use server";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@/lib/prisma"

export async function ensureUserExists() {
  const user = await currentUser();
  
  if (!user) return null;

  const existing = await Prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!existing) {
    await Prisma.user.create({
      data: {
        name: user.fullName ?? "No Name",
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  }
}
