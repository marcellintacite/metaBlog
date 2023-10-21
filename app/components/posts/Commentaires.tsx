import React from "react";

type Props = {
  id: string;
};

export default function Commentaires({ id }: Props) {
  return (
    <section
      className="
    mt-6 border-t-2 border-gray-200 dark:border-gray-700 pt-6
  "
    >
      <h2
        className="
    font-bold text-xl dark:text-white
      "
      >
        Commentaires
      </h2>
      <form className="mt-6 flex flex-col gap-3 md:w-96 w-full">
        <input
          type="text"
          placeholder="Votre nom"
          className="
    border-2 border-gray-200 dark:border-gray-700 rounded-md p-3
        "
        />
        <textarea
          placeholder="Votre commentaire"
          className="
    border-2 border-gray-200 dark:border-gray-700 rounded-md p-3
        "
        ></textarea>
        <button
          type="submit"
          className="
    bg-blue-500 text-white rounded-md py-2 px-4
        "
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
