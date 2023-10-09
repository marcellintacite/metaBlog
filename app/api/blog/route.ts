import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const article = await request.json();

  const { titre, categorie, contenu, image, useremail } = article;

  const prisma = new PrismaClient();
  const userId = await prisma.user.findUnique({
    where: { email: useremail || "" },
  });
  if (userId) {
    const post = await prisma.article.create({
      data: {
        title: titre,
        category: categorie,
        content: contenu,
        imgLink: image,
        authorId: userId.id,
      },
    });
    prisma.$disconnect();

    return NextResponse.json(article, {
      status: 201,
    });
  } else {
    prisma.$disconnect();
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}

export async function GET(request: any) {
  const prisma = new PrismaClient();
  const articles = await prisma.article.findMany();
  console.log(articles);

  prisma.$disconnect();

  return NextResponse.json(articles, {
    status: 200,
  });
}
