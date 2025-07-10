import ArticleDetails from '@/components/Articles/ArticleDetails'
import { Prisma } from '@/lib/prisma'
import React from 'react'


type articleDetailPageProps = {
    params:Promise<{id:string}>
}

const ArticleDetailsPage :React.FC<articleDetailPageProps> = async ({params}) => {
  
  const id = (await params).id

  const article = await Prisma.article.findUnique({
    where:{
        id
    },
    include:{
        author:{
            select:{
                name:true,
                email:true, 
                imageUrl:true
            }
        }
    }

  })
  if (!article) {
    return <h1>Article not found</h1>
  }

    return (
    <div><ArticleDetails article={article}/></div>
  )
}

export default ArticleDetailsPage