"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "sonner";

const removeArticle = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog/${id}`, {
    method: "DELETE",
  });
  if (res.status === 200) {
    toast.success("Article supprimé avec succès");
    return true;
  } else {
    toast.error(
      "Une erreur s'est produite lors de la suppression de l'article"
    );
    return false;
  }
};

export default function ActionBlog({ id }: { id: string }) {
  const router = useRouter();
  const handleRemove = async () => {
    const resultat = await removeArticle(id);
    if (resultat) {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <Link
        href={`/blog/${id}/edit`}
        className="
flex items-center gap-2 text-blue-400 hover:underline
"
      >
        <AiOutlineEdit />
        <p>Modifier</p>
      </Link>
      <button
        className="flex items-center gap-2 text-red-400"
        onClick={handleRemove}
      >
        <AiOutlineDelete />
        <p>Effacer</p>
      </button>
    </>
  );
}
