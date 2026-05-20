"use client";

import {
  FaBars,
  FaBell,
} from "react-icons/fa";

import ThemeToggle from "../ui/theme-toggle";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/context/AuthContext";

interface Props {
  setMobileOpen: (
    value: boolean
  ) => void;
}

export default function Navbar({
  setMobileOpen,
}: Props) {

  const {
    user,
    role,
  } = useAuth();

  return (
    <header
      className="
        h-20
        bg-[var(--sidebar)]
        backdrop-blur-xl
        border-b
        border-[var(--card-border)]
        flex
        items-center
        justify-between
        px-6
      "
    >

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="
            lg:hidden
            w-12
            h-12
            rounded-xl
            glass-card
            flex
            items-center
            justify-center
          "
        >

          <FaBars />

        </button>

        <div>

          <h2 className="text-xl font-black tracking-tight sm:text-2xl">

            Dashboard

          </h2>

          <p className="text-sm text-[var(--muted)]">

            {user?.full_name
              ? `${user.full_name} · ${role}`
              : "Unified Wealth Platform"}

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        <button
          className="
            w-12
            h-12
            rounded-xl
            border
            border-[var(--card-border)]
            bg-[var(--card)]
            flex
            items-center
            justify-center
          "
        >

          <FaBell />

        </button>

        <ThemeToggle />

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-blue-600
            flex
            items-center
            justify-center
            text-xl
          "
        >
          <ProfileDropdown />  

        </div>

      </div>

    </header>
  );
}
