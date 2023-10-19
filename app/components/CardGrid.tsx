import React from "react";

import { AiOutlineUser } from "react-icons/ai";
import illustration from "@/public/img/ill.jpg";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

type Props = {
  categorie: string;
};

export default async function CarteGrid({ categorie }: Props) {
  const prisma = new PrismaClient();
  const recentBlog = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      category: categorie,
    },
  });

  prisma.$disconnect();

  if (recentBlog.length === 0) return null;
  const curentBlog = recentBlog[0];

  const author = await prisma.user.findUnique({
    where: {
      id: curentBlog.authorId,
    },
  });

  return (
    <div
      className={`w-full flex flex-col  justify-end my-4 rounded-xl relative pb-8 h-full
      `}
      style={{
        backgroundImage: `linear-gradient(90deg,#0009,#3338), url(${curentBlog.imgLink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-8 text-white">
        <p
          className=" w-max
            bg-blue-500 text-white px-3 py-2 rounded-md mb-2
        "
        >
          {curentBlog.category}
        </p>
        <Link
          href={`/blog/${curentBlog.id}`}
          className="
            text-2xl md:text-3xl font-bold my-4 md:w-3/4 hover:underline transition-all 
        "
        >
          {curentBlog.title}
        </Link>
        <div className="flex gap-7 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <AiOutlineUser className="text-gray-700" size={20} />
            </div>
            <p>{author?.name}</p>
          </div>
          <div className="text-gray-300">
            <p>
              {new Date(curentBlog.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
