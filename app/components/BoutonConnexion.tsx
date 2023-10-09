"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";

type Props = {};

export default function BoutonConnexion({}: Props) {
  const { data: session } = useSession();
  const [show, setShow] = React.useState(false);

  if (session && session.user) {
    return (
      <div className="block relative">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="profile"
            width={40}
            className="rounded-full cursor-pointer active:scale-90 transition duration-150 ease-out"
            height={40}
            onClick={() => setShow(!show)}
          />
        )}
        <div
          className={`${
            show ? "flex" : "hidden"
          } flex-col  justify-start min-w-[200px] shadow-md absolute top-12 right-0 bg-white rounded-md p-2 gap-2 `}
          onMouseLeave={() => setShow(false)}
        >
          <Link
            href={`/profile/${session.user.email}`}
            className="
            p-2 hover:bg-slate-100 rounded-md flex items-center gap-2 transition duration-150 ease-out
          "
          >
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="
            p-2 hover:bg-slate-100 rounded-md flex items-center gap-2 transition duration-150 ease-out
          "
          >
            Déconnexion
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={() => signIn()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connexion
      </button>
    </div>
  );
}
