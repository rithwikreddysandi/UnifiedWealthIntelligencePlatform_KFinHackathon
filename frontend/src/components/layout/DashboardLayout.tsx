"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const {
    token,
    loading,
  } = useAuth();

  const router = useRouter();

  // PROTECTED ROUTE

  useEffect(() => {

    if (!loading && !token) {

      router.push("/login");
    }

  }, [token, loading]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>
    );
  }

  return (
    <div className="app-shell">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={
          setMobileOpen
        }
      />

      {/* MAIN */}

      <div className="lg:ml-[280px]">

        <Navbar
          setMobileOpen={
            setMobileOpen
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>
  );
}
