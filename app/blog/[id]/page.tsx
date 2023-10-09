import { authOptions } from "@/app/libs/authAuptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import illu from "@/public/img/ill.jpg";
import Link from "next/link";
import ActionBlog from "@/app/components/ActionBlog";
import { notFound } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};

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
    <main className=" mx-2 md:mx-11 pb-6">
      <header className="flex flex-col gap-4 mt-6">
        <p className="badge-bold">{article.category}</p>
        <h2 className="title">{article.title}</h2>
        <footer className="flex gap-4 mt-2 items-center text-gray-500">
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

        <h2
          className="
        text-2xl font-semibold text-slate-900 mt-5
        "
        >
          Introduction
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          perspiciatis vitae? Soluta veniam molestiae sed corporis omnis
          obcaecati natus ipsam eum placeat? Cum placeat deleniti, reiciendis
          impedit aspernatur ut molestiae ducimus, eum temporibus, eaque vero
          atque. Eos officiis pariatur quidem vitae blanditiis aliquid veritatis
          quod modi fugit accusamus cum non enim aut earum, laboriosam
          reiciendis illum! Laborum quos consequatur ab mollitia adipisci rerum
          quod impedit perferendis distinctio quam possimus, repudiandae, itaque
          temporibus vel officiis. Deserunt dolor earum inventore expedita
          ratione amet cumque? Impedit architecto incidunt aut, facere labore
          nobis illum nulla accusamus quae placeat. Molestias quo dolorum
          accusamus id esse.
        </p>
        <h2
          className="
        text-2xl font-semibold text-slate-900 mt-5
        "
        >
          Conclusion
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          molestiae soluta, quam odit obcaecati iusto delectus nostrum
          voluptatibus illum ut facere voluptates tempora cum laboriosam non aut
          omnis odio reprehenderit numquam. Doloribus perferendis, quibusdam
          veniam vitae alias voluptatibus architecto asperiores similique saepe
          facilis eligendi cum quo iste recusandae repellat quasi rerum odit,
          nihil laboriosam, at itaque ipsum maiores culpa? Atque, sequi! Rem
          pariatur, nostrum labore nulla maiores aspernatur commodi dolorum
          molestias quisquam asperiores eaque assumenda rerum repellat porro
          culpa, sit necessitatibus beatae maxime ex tempora quasi at? Voluptate
          recusandae velit fugit ut corporis atque consequatur doloremque
          accusantium voluptas possimus eius blanditiis aspernatur distinctio
          corrupti, minus aliquid, ratione provident dolorem quibusdam,
          repellendus eos eum nihil sit sequi. At, quam voluptatibus. Modi earum
          quis distinctio, nobis cupiditate dicta sequi, laborum quo hic odio
          facere, maxime dignissimos aut tenetur. Ducimus itaque veritatis
          suscipit! Voluptatibus sed, incidunt facilis minus maxime molestiae
          cum. Tenetur, nostrum minima deleniti earum exercitationem
          perspiciatis ipsam doloribus, sed velit tempora quas in vitae porro
          veritatis eaque harum veniam, at explicabo! Placeat magni incidunt
          praesentium adipisci, et nesciunt, odio ducimus cupiditate quisquam
          aut quidem, vitae deserunt aperiam maiores accusantium. Vitae quae
          consequatur maiores enim modi quibusdam sequi necessitatibus non qui
          veritatis.
        </p>
      </div>
    </main>
  );
}
