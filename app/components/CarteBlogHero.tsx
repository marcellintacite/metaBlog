import React from "react";

import { AiOutlineUser } from "react-icons/ai";
import illustration from "@/public/img/ill.jpg";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

type Props = {};

export default async function CarteBlogHero({}: Props) {
  const prisma = new PrismaClient();
  const recentBlog = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const curentBlog = recentBlog[0];

  const author = await prisma.user.findUnique({
    where: {
      id: curentBlog.authorId,
    },
  });

  prisma.$disconnect();

  return (
    <div
      className={`min-h-[360px] flex flex-col  justify-end my-4 rounded-xl relative pb-8
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
            bg-blue-500 text-white px-3 py-2 rounded-md mb-4
        "
        >
          {curentBlog.category}
        </p>
        <Link
          href={`/blog/${curentBlog.id}`}
          className="
            text-3xl md:text-4xl  font-bold my-4 md:w-3/4 hover:underline transition-all 
        "
        >
          {curentBlog.title}
        </Link>
        <div className="flex gap-7 items-center mt-4">
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
