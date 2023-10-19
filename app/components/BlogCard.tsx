import React, { use } from "react";
import i from "@/public/img/im.png";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

type Props = {
  data: articleType;
};

export default async function BlogCard({ data }: Props) {
  const prisma = new PrismaClient();

  const user = await prisma.user
    .findUnique({ where: { id: data.authorId } })
    .catch((e) => {
      console.log(e);
    });
  prisma.$disconnect();
  return (
    <div className=" w-full flex flex-col gap-3 p-3 borderbg-dark-800 border dark:border-[#242535] border-gray-300 rounded-xl">
      <Image
        src={data.imgLink}
        alt="Blog illustration"
        className="
        w-full rounded-md
      "
        width={300}
        height={200}
      />
      <div className="flex flex-col gap-4">
        <p className="badge dark:text-blue-500 dark:bg-transparent">
          {data.category}
        </p>

        <Link
          href={`/blog/${data.id}`}
          className="text-2xl font-semibold text-slate-900 hover:underline transition-all
            hover:text-slate-800 dark:text-white dark:hover:text-slate-200 dark:hover:underline
          "
        >
          {data.title}
        </Link>

        <footer className="flex gap-4 items-center text-gray-500">
          <div className="flex items-center gap-3">
            <Image
              src={user?.imgLink ? user.imgLink : i}
              alt="Blog illustration"
              width={30}
              height={30}
              className="
                    rounded-full w-9 h-9
                "
            />
            <p>{user?.name}</p>
          </div>

          <p>
            {new Date(data.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </footer>
      </div>
    </div>
  );
}
