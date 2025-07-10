"use server"
import { Prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { X } from "lucide-react"
import { revalidatePath } from "next/cache"
import {z} from "zod"

const CreateCommentSchema = z.object({
    comment:z.string().min(1)
})

type CreateCommentFormState = {
    errors:{
        comment?:string[],
        formError?:string[]
    }
}

export const CreateComment = async (articleId:string,prevState:CreateCommentFormState,formData:FormData) : Promise<CreateCommentFormState>=>{

    const result  = CreateCommentSchema.safeParse({
        comment:formData.get("comment")
    })

    if (!result.success) {
        return{
            errors:result.error.flatten().fieldErrors
        }
    }

    const {userId} = await auth()

    if (!userId) {
        return{
            errors:{
                formError:["you have to login first"]
            }
        }
    }
    const existingUser = await Prisma.user.findUnique({
        where:{
            clerkUserId:userId
        }

    })
    if (!existingUser) {
        return{
            errors:{
                formError:["user not found. please register yourself"]
            }
        }
    }
    try {
        await Prisma.comment.create({
            data:{
                body:result.data.comment,
                authorId:existingUser.id,
                articleId
            }
        })
    } catch (error:unknown) {
        if (error instanceof Error) {
            return{
                errors:{
                    formError:[error.message]
                }
            }
        }else{
            return{
                errors:{
                    formError:["something went wrong"]
                }
            }
        }
    }
    revalidatePath(`/articles/${articleId}`)
    return {errors:{}}

}
