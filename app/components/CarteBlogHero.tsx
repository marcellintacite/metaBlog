import React from "react";

import { AiOutlineUser } from "react-icons/ai";
import illustration from "@/public/img/ill.jpg";

type Props = {};

export default function CarteBlogHero({}: Props) {
  return (
    <div
      className={`min-h-[360px] flex flex-col  justify-end my-4 rounded-xl relative pb-8
      `}
      style={{
        backgroundImage: `linear-gradient(90deg,#0009,#3338), url(${illustration.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-8 text-white">
        <p
          className=" w-max
            bg-blue-500 text-white px-3 py-2 rounded-md
        "
        >
          Technology
        </p>
        <h1
          className="
            text-3xl font-bold my-4 md:w-3/4
        "
        >
          The Impact of Technology on the Workplace: How Technology is Changing
        </h1>
        <div className="flex gap-7 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <AiOutlineUser className="text-gray-700" size={20} />
            </div>
            <p>Admin</p>
          </div>
          <div className="text-gray-300">
            <p>25/05/2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}
