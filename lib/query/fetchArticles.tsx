import { Prisma } from "../prisma";

export const fetchArticles = async (
  searchText: string,
  skip: number,
  take: number
) => {
  const [articles, total] = await Prisma.$transaction([
    Prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { category: { contains: searchText, mode: "insensitive" } },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
      skip: skip,
      take: take,
    }),
    Prisma.article.count({
      where: {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { category: { contains: searchText, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return { articles, total };
};
