import { Box, Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./libs/authAuptions";
import CardBlogHero from "./components/CarteBlogHero";
import BlogCard from "./components/BlogCard";
import Link from "next/link";

const getArticles = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/blog`, {
    next: {
      revalidate: 1,
    },
  });
  const articles = await res.json();
  return articles;
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  const articles = await getArticles();

  return (
    <main>
      <div
        className="
      flex flex-col items-center justify-center my-4
      "
      >
        <h2
          className="
            font-bold text-4xl text-center
          "
        >
          Mon blog
        </h2>
        <p className="text-lg text-center">Accueil</p>
      </div>
      <CardBlogHero />
      <div className="mt-8">
        <h2
          className="
        font-bold text-2xl
        "
        >
          Autres articles
        </h2>

        {articles.length === 0 && (
          <div className="text-center text-gray-600 mt-6">
            <p className="text-2xl text-blue-950">
              Aucun article pour le moment
            </p>
            <div className="mt-5">
              <Link
                href={"/blog/create"}
                className="
            mt-4 bg-slate-900 text-white px-4 py-2 rounded-md
            "
              >
                Ajouter un article
              </Link>
            </div>
          </div>
        )}

        {articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 pb-6">
            {articles.map((article: articleType) => (
              <BlogCard key={article.id} data={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
