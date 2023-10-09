import React from "react";
import i from "@/public/img/im.png";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function BlogCard({}: Props) {
  return (
    <div className=" w-full flex flex-col gap-3 p-3 border border-gray-300 rounded-md">
      <Image
        src={i}
        alt="Blog illustration"
        className="
        w-full rounded-md
      "
      />
      <div className="flex flex-col gap-4">
        <p className="badge">Technology</p>

        <Link
          href={"/blog/2"}
          className="text-2xl font-semibold text-slate-900 hover:underline transition-all
            hover:text-slate-800
          "
        >
          Comment créer un blog avec Next.js et Chakra UI ?
        </Link>

        <footer className="flex gap-4 items-center text-gray-500">
          <div className="flex items-center gap-3">
            <Image
              src={i}
              alt="Blog illustration"
              className="
                    rounded-full w-9 h-9
                "
            />
            <p>Par tacite</p>
          </div>

          <p>Le 20/08/2021</p>
        </footer>
      </div>
    </div>
  );
}
