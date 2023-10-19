"use client";
import React from "react";
import { BsSunFill, BsMoonStars } from "react-icons/Bs";

type Props = {};

export default function DarkMode({}: Props) {
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const handleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };
  return (
    <>
      {darkMode ? (
        <BsMoonStars onClick={handleDarkMode} className="pointer" size={20} />
      ) : (
        <BsSunFill onClick={handleDarkMode} className="pointer" size={20} />
      )}
    </>
  );
}
