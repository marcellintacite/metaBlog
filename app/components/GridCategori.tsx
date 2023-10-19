import React from "react";
import CarteGrid from "./CardGrid";

type Props = {};

export default function GridCategori({}: Props) {
  return (
    <div
      className="
      grid grid-cols-1  gap-4 md:grid-cols-2
  "
    >
      <div className="col-span-1 ">
        <CarteGrid categorie="Actualité" />
      </div>
      <div
        className="
        grid grid-rows-2 gap-4
      "
      >
        <CarteGrid categorie="Tuto" />
        <CarteGrid categorie="Technologie" />
      </div>
    </div>
  );
}
