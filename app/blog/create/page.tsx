import AjouterForm from "@/app/components/AjouterForm";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="dark:text-white">
      <h1
        className="
        text-2xl font-semibold text-slate-900 mt-5 dark:text-white
      "
      >
        Créer un article
      </h1>
      <AjouterForm />
    </main>
  );
}
