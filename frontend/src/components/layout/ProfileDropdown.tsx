"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaIdBadge,
} from "react-icons/fa";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

export default function ProfileDropdown() {

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const {
    logout,
    role,
    user,
    investorId,
  } =
    useAuth();

  const router = useRouter();

  useEffect(() => {

    const handler = (
      event: MouseEvent
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );

  }, []);

  const handleLogout = () => {

    logout();

    router.push("/login");
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >

      {/* BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          w-12
          h-12
          rounded-2xl
          bg-blue-600
          flex
          items-center
          justify-center
          text-xl
          hover:scale-105
          transition-all
        "
      >

        <FaUser />

      </button>

      {/* DROPDOWN */}

      {open && (

        <div
          className="
            absolute
            right-0
            mt-4
            w-64
            glass-card
            rounded-3xl
            p-4
            z-50
          "
        >

          <div className="pb-4 border-b border-[var(--card-border)]">

            <h3 className="font-bold text-lg">

              {user?.full_name || role || "User"}

            </h3>

            <p className="text-sm text-[var(--muted)] mt-1">

              {user?.email || "Enterprise Wealth Platform"}

            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-500">
                {role || "ROLE"}
              </span>

              {investorId && (
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-500">
                  Investor
                </span>
              )}
            </div>

          </div>

          <div className="mt-4 space-y-2">

            <Link
              href="/settings"
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                hover:bg-black/10
                transition-all
              "
            >

              <FaCog />

              Settings

            </Link>

            <Link
              href="/profile"
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                hover:bg-black/10
                transition-all
              "
            >

              <FaIdBadge />

              Profile

            </Link>

            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                hover:bg-red-500/20
                text-red-400
                transition-all
              "
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>
      )}

    </div>
  );
}
