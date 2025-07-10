import React from 'react'
import LikeButton from './LikeButton'
import { Prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

type likeButtonActionProps = {
    articleId: string
}

const LikeBUttonAction: React.FC<likeButtonActionProps> = async ({ articleId }) => {
    const Likes = await Prisma.like.findMany({
        where: {
            articleId
        }
    })
    const { userId } = await auth()
    if (!userId) return null
    const user = await Prisma.user.findUnique({
        where: {
            clerkUserId: userId  
        }
    })
    const isLiked :boolean = Likes.some((like)=>like.userId == user?.id)

    return (
        <div><LikeButton articleId={articleId} likes={Likes} isLiked={isLiked} /></div>
    )
}

export default LikeBUttonAction