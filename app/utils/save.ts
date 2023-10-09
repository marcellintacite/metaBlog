import { PrismaClient } from "@prisma/client";

// titre, categorie, content, imgLink
export const enreigistrerPost = async (
  post: {
    titre: string;
    categorie: string;
    content: string;
    imgLink: string;
  },
  email: string | "" | undefined | null
) => {
  const prisma = new PrismaClient();

  const userId = await prisma.user.findUnique({
    where: { email: email || "" },
  });

  console.log(userId);
};
