"use client";
import React from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";

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
        <FaRegMoon onClick={handleDarkMode} className="pointer" size={20} />
      ) : (
        <FaSun onClick={handleDarkMode} className="pointer" size={20} />
      )}
    </>
  );
}
