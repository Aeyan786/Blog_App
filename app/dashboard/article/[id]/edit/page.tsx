import EditArticle from "@/components/Articles/EditArticle";
import { Prisma } from "@/lib/prisma";
import React from "react";

type EditArticlePageParams = {
  params: Promise<{ id: string }>;
};

const Editpage: React.FC<EditArticlePageParams> = async ({ params }) => {
  const id = (await params).id;
  const article = await Prisma.article.findUnique({
    where: { id },
  });
  if (!article) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="font-medium">Articles not found for this {id}</h1>
      </div>
    );
  }

  return (
    <div>
      <EditArticle article={article} />
    </div>
  );
};

export default Editpage;
