"use client";

import { useTheme } from "next-themes";

import {
  FaMoon,
  FaSun,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

export default function ThemeToggle() {

  const {
    theme,
    setTheme,
  } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // PREVENT HYDRATION ERROR

  if (!mounted) {
    return (
      <div
        className="
          w-12
          h-12
          rounded-2xl
          glass-card
        "
      />
    );
  }

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="
        w-12
        h-12
        rounded-2xl
        flex
        items-center
        justify-center
        glass-card
        hover:scale-105
        transition-all
      "
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-slate-700 text-lg" />
      )}
    </button>
  );
}