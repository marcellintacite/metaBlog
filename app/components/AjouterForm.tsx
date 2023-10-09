"use client";

import React from "react";
import "@uploadthing/react/styles.css";
import { UploadButton } from "../utils/uploadthing";
import { toast } from "sonner";
import Image from "next/image";
import Editor from "./Editor";
import { useSession } from "next-auth/react";
import { verifierChamps } from "../utils/fieldVerfication";
import { PrismaClient } from "@prisma/client";
import { enreigistrerPost } from "../utils/save";
import { useRouter, usePathname } from "next/navigation";

type Props = {};

export default function AjouterForm({}: Props) {
  const [imgLink, setImgLink] = React.useState("");
  const [content, setContent] = React.useState("");
  const [titre, setTitre] = React.useState("");
  const [categorie, setCategorie] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const { data } = useSession();

  const baseUrl = window.location.origin + "/api/blog";

  const router = useRouter();

  const handleSubmit = async () => {
    const resultat = verifierChamps(titre, categorie, content, imgLink);

    if (resultat) {
      // making a post request using post
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: titre,
          categorie: categorie,
          contenu: content,
          image: imgLink,
          useremail: data?.user?.email,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            toast.success("Article publié avec succès");
            router.refresh();
            router.push("/");
          } else {
            toast.error(
              "Une erreur s'est produite lors de la publication de l'article"
            );
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);

          toast.error(
            "Une erreur s'est produite lors de la publication de l'article"
          );
        });
    }
  };

  return (
    <div className="md:w-3/5">
      <div className="mt-5 pb-6">
        <div className="flex ">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              // Do something with the response
              console.log("Files: ", res);
              setImgLink(res[0].url);
              console.log("imgLink: ", imgLink);
              toast.success("Image uploadée avec succès");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            className=""
          />
          {imgLink ? (
            <Image
              alt=""
              src={imgLink}
              className=" rounded-md "
              width={200}
              height={200}
            />
          ) : null}
        </div>
        <div className="grid gap-6 mb-6 mt-4 md:grid-cols-2">
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="first_name" className="">
              Titre de l'article
            </label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              id="first_name"
              className="bg-gray-50 outline-none border-b-2 border-gray-300 text-gray-900    h-12 text-lg block w-full p-2.5  "
              placeholder="Titre de l'article"
              required
            />
          </div>
        </div>
        <div className="">
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="mt-4">
          <label
            htmlFor="categorie"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Choisir la catégorie
          </label>
          <select
            id="countries"
            value={categorie}
            required
            onChange={(e) => setCategorie(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 y-600  w-max"
          >
            <option>Choisir une catégorie</option>
            <option value={"Technologie"}>Technologie</option>
            <option value="Actualité">Actualité</option>
            <option value="Tuto">Tuto</option>
            <option value="Annonce">Annonce</option>
          </select>
        </div>
        <div className="flex gap-5">
          <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4">
            Enreigistrer
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
}
