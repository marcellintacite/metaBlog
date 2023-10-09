import Link from "next/link";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <main
      className="text-center
        flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]
    "
    >
      <h1 className="title text-blue-400">Il y a eu une erreur</h1>
      <p className="mt-4">
        Nous n'avons pas trouvé la page que vous cherchez, veuillez réessayer
        plus tard ou contacter l'administrateur du site.
      </p>
      <p>
        Vous pouvez aussi retourner à la page d'accueil en cliquant{" "}
        <Link href="/" className="lien">
          ici
        </Link>
      </p>
    </main>
  );
}
