import { authOptions } from "@/app/libs/authAuptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import illu from "@/public/img/ill.jpg";
import Link from "next/link";
import ActionBlog from "@/app/components/ActionBlog";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { Metadata, ResolvingMetadata } from "next";
import Commentaires from "@/app/components/posts/Commentaires";
type Props = {
  params: {
    id: string;
  };
};

// Generation des metadata

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // Recherche de l'article
  const { article } = await fetch(
    `${process.env.BASE_URL}/api/blog/${id}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    openGraph: {
      images: [article.imgLink, ...previousImages],
    },
  };
}

const getArticle = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog/${id}`, {
    next: {
      revalidate: 1,
    },
  });
  const data = await res.json();
  return data;
};

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);

  const { article, author } = await getArticle(params.id);

  if (!article) return notFound();

  return (
    <main className=" mx-2 md:mx-11 pb-6 dark:text-white">
      <header className="flex flex-col gap-4 mt-6">
        <p className="badge-bold ">{article.category}</p>
        <h2 className="title dark:text-white">{article.title}</h2>
        <footer className="flex gap-4 mt-2 md:items-center text-gray-500 flex-col md:flex-row">
          <div className="flex items-center gap-3">
            {session?.user?.image && (
              <Image
                src={author.imgLink ? author.imgLink : session.user.image}
                alt="Blog illustration"
                className="
                        rounded-full w-9 h-9
                  "
                width={36}
                height={36}
              />
            )}

            <p>{author.name}</p>
          </div>

          <p>
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {author.email === session?.user?.email && (
            <ActionBlog id={params.id} />
          )}
        </footer>
      </header>
      <div className="mt-5">
        <Image
          src={
            article.imgLink
              ? article.imgLink
              : "https://images.unsplash.com/photo-1622"
          }
          width={500}
          height={300}
          alt="Blog illustration"
          className="rounded-md w-full md:w-2/3 m-auto"
        />
        <div className="mt-4">{parse(article.content)}</div>
        {session ? (
          <Commentaires id={params.id} />
        ) : (
          <div
            className="
          w-full border-t-2 border-gray-200 dark:border-gray-700 mt-8
          "
          >
            <p className="text-center mt-4 font-bold">
              Vous devez être connecté pour commenter
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
