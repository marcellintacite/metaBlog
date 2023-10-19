import Image from "next/image";
import React from "react";
import logo from "@/public/img/logo.png";
import Link from "next/link";
import { FaSearch, FaPlus } from "react-icons/fa";
import BoutonConnexion from "./BoutonConnexion";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import DarkMode from "./DarkMode";

type Props = {};

export default async function Header({}: Props) {
  const session = await getServerSession();
  const prisma = new PrismaClient();
  if (session) {
    const res = await prisma.user
      .findUnique({
        where: { email: session.user?.email || "" },
      })
      .catch((e) => {
        console.log(e);
      });

    if (res === null) {
      const user = await prisma.user
        .create({
          data: {
            email: session.user?.email || "",
            name: session.user?.name || "",
            imgLink: session.user?.image || "",
          },
        })
        .then((res) => prisma.$disconnect());
    } else {
      prisma.$disconnect();
    }
  }
  return (
    <header
      className="flex justify-between h-20 items-center dark:bg-dark dark:text-white
    
    sticky top-0 z-50 bg-white shadow-sm px-4 md:px-11
    "
    >
      <div className="flex gap-5 items-center">
        <Link className="text-2xl" href={"/"}>
          Meta<span className="font-bold">Blog</span>
        </Link>
        <DarkMode />
      </div>

      <nav className="hidden md:hidden lg:block">
        <ul className="flex gap-7">
          <li className="">
            <Link href={"/"}>Accueil</Link>
          </li>
          <li>
            <Link href={"/"}>Blog</Link>
          </li>
          <li>
            <Link href={"/"}>Contact</Link>
          </li>
        </ul>
      </nav>
      <form
        className="
      md:flex gap-3 bg-gray-100 rounded-md p-2 items-center hidden 
      "
      >
        <input
          type="text"
          placeholder="Rechercher"
          className="bg-transparent outline-none border-none"
        />
        <button type="submit">
          <FaSearch className="text-gray-500 hover:text-gray-700 cursor-pointer" />
        </button>
      </form>
      <div
        className="
      flex gap-6 items-center
      "
      >
        {session ? (
          <Link href={"/blog/create"}>
            <FaPlus className="text-2xl text-gray-900 dark:text-white hover:text-gray-700 cursor-pointer" />
          </Link>
        ) : null}
        <BoutonConnexion />
      </div>
    </header>
  );
}
