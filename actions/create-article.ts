"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CreateArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(50),
});

type createArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formError?: string[];
  };
};

export const CreateArticle = async (
  value: string,
  prevState: createArticleFormState,
  formData: FormData
): Promise<createArticleFormState> => {

  const result = CreateArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: value,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formError: ["You have to login first!"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!existingUser) {
    return {
      errors: {
        formError: ["Register yourself before publishing"],
      },
    };
  }
  let imageUrl = "";
  const imageFile = formData.get("featuredimage") as File | null;
  if (!imageFile || imageFile.name === undefined || imageFile.size === 0) {
    return {
      errors: {
        featuredImage: ["Image file is required"],
      },
    };
  }
  if (imageFile && imageFile.name && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(buffer);
      }
    );
     imageUrl = uploadResponse?.secure_url || "";

    if (!imageUrl) {
      return {
        errors: {
          featuredImage: ["failed to upload image, try again"],
        },
      };
    }
  }

  try {
    await prisma.article.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["something went wrong"],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
};
