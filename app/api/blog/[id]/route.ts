import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: any, params: any) {
  console.log(params);

  const prisma = new PrismaClient();
  const article = await prisma.article.findUnique({
    where: { id: params.params.id },
  });
  const author = await prisma.user.findUnique({
    where: { id: article?.authorId || "" },
  });

  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  prisma.$disconnect();

  return NextResponse.json(
    { article, author },
    {
      status: 200,
    }
  );
}

export async function DELETE(request: any, params: any) {
  const prisma = new PrismaClient();
  const article = await prisma.article.delete({
    where: { id: params.params.id },
  });

  console.log(article);

  prisma.$disconnect();

  return NextResponse.json({ message: "Article effacé " }, { status: 200 });
}
