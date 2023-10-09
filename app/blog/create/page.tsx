import AjouterForm from "@/app/components/AjouterForm";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main>
      <h1
        className="
        text-2xl font-semibold text-slate-900 mt-5
      "
      >
        Créer un article
      </h1>
      <AjouterForm />
    </main>
  );
}
