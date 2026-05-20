"use client";

import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import Link from "next/link";

import { useState } from "react";

import toast from "react-hot-toast";

import { loginUser } from "@/services/auth.service";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import ThemeToggle from "@/components/ui/theme-toggle";
import { ROLES } from "@/config/roles";

export default function LoginPage() {

  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await loginUser(formData);

        if (!response.success) {

          toast.error(
            response.message
          );

          return;
        }

        const token =
          response.data
            .accessToken ||
          response.data
            .access_token ||
          response.data.token;

        const role =
          response.data.role ||
          response.data.user?.role ||
          "INVESTOR";

        const investorId =
          response.data.investor?.investor_id ||
          response.data.investor?.id ||
          null;

        login(
          token,
          role,
          investorId,
          response.data.user || null
        );

        toast.success(
          "Login Successful"
        );

        const roleRoute =
          ROLES.find(
            (item) =>
              item.name === role
          )?.route || "/dashboard";

        router.push(roleRoute);

      } catch (error) {

        toast.error(
          "Login Failed"
        );

      } finally {

        setLoading(false);
      }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">

      {/* BACKGROUND */}

      {/* TOGGLE */}

      <div className="absolute top-6 right-6">

        <ThemeToggle />

      </div>

      {/* CARD */}

      <div className="w-full max-w-md premium-card rounded-3xl p-8 relative z-10">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-black">

            Welcome Back

          </h1>

          <p className="text-[var(--muted)] mt-3">

            Login to your account

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="text-sm text-[var(--muted)] mb-2 block">

              Email Address

            </label>

            <div className="relative">

              <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="Enter email"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-xl
                  bg-[var(--card)]/70
                  border
                  border-[var(--card-border)]
                  focus:border-blue-500
                  outline-none
                "
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="text-sm text-[var(--muted)] mb-2 block">

              Password

            </label>

            <div className="relative">

              <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

              <input
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter password"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-xl
                  bg-[var(--card)]/70
                  border
                  border-[var(--card-border)]
                  focus:border-blue-500
                  outline-none
                "
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-xl
              btn-primary
              font-semibold
              text-lg
              transition-all
              hover:scale-[1.02]
            "
          >
            {loading
              ? "Please wait..."
              : "Login"}
          </button>

        </form>

        <p className="text-center mt-8 text-[var(--muted)]">

          Don't have an account?

          <Link
            href="/register"
            className="text-blue-500 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </main>
  );
}
