import { Box, Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./libs/authAuptions";
import CardBlogHero from "./components/CarteBlogHero";
import BlogCard from "./components/BlogCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 pb-6">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </main>
  );
}
