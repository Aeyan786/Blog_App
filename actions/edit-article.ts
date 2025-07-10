"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const EditArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string(),
});

type EditArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formError?: string[];
  };
};

export const EditArticleAction = async (
  articleId: string,
  value: string,
  prevState: EditArticleFormState,
  formData: FormData
): Promise<EditArticleFormState> => {

  const result = EditArticleSchema.safeParse({
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

  const existingArticle = await Prisma.article.findUnique({
    where: { id: articleId },
  });
  if (!existingArticle) {
    return {
      errors: {
        formError: ["Article not found with this Id"],
      },
    };
  }

  const existingUser = await Prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!existingUser || existingArticle.authorId !== existingUser.id) {
    return {
      errors: {
        formError: ["Register yourself before Editing"],
      },
    };
  }

  let imageUrl = existingArticle.featuredImage;
  const imageFile = formData.get("featuredimage") as File | null;

  if (imageFile && imageFile.name && imageFile.size > 0) {
    try {
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

      if (uploadResponse?.secure_url) {
        imageUrl = uploadResponse.secure_url;
      } else {
        return {
          errors: {
            featuredImage: ["Failed to upload image, try again"],
          },
        };
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return {
        errors: {
          formError: ["Error uploading image"],
        },
      };
    }
  }

  try {
    await Prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
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
