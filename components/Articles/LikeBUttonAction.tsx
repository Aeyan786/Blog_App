import React from 'react'
import LikeButton from './LikeButton'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

type likeButtonActionProps = {
    articleId: string
}

const LikeBUttonAction: React.FC<likeButtonActionProps> = async ({ articleId }) => {
    const Likes = await prisma.like.findMany({
        where: {
            articleId
        }
    })
    const { userId } = await auth()
    if (!userId) return null
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId  
        }
    })
    const isLiked :boolean = Likes.some((like:any)=>like.userId == user?.id)

    return (
        <div><LikeButton articleId={articleId} likes={Likes} isLiked={isLiked} /></div>
    )
}

export default LikeBUttonAction