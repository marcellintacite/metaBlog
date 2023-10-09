import Image from "next/image";
import React from "react";
import logo from "@/public/img/logo.png";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import BoutonConnexion from "./BoutonConnexion";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="flex justify-between h-24 items-center">
      <div>
        <p className="text-2xl">
          Meta<span className="font-bold">Blog</span>
        </p>
      </div>

      <nav className="hidden md:block">
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
      <div>
        <BoutonConnexion />
      </div>
    </header>
  );
}
