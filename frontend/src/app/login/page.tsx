"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";

import Link from "next/link";

import { useState } from "react";

import toast from "react-hot-toast";

import { loginUser } from "@/services/auth.service";

import { useRouter } from "next/navigation";

import { useAuth, UserRole } from "@/context/AuthContext";

import ThemeToggle from "@/components/ui/theme-toggle";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRoleRoute = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";

      case "OPERATIONS":
        return "/operations/dashboard";

      case "COMPLIANCE":
        return "/compliance/dashboard";

      case "INVESTOR":
      default:
        return "/investor/dashboard";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      if (!response.success) {
        toast.error(response.message || "Invalid credentials");
        return;
      }

      const token =
        response.data?.accessToken ||
        response.data?.access_token ||
        response.data?.token;

      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      const rawRole =
        response.data?.role || response.data?.user?.role || "INVESTOR";

      let role: UserRole;

      switch (rawRole?.toUpperCase()) {
        case "ADMIN":
          role = "ADMIN";
          break;

        case "OPERATIONS":
          role = "OPERATIONS";
          break;

        case "COMPLIANCE":
        case "AUDITOR":
          role = "COMPLIANCE";
          break;

        default:
          role = "INVESTOR";
      }

      const investorId =
        response.data?.investor?.investor_id ||
        response.data?.investor?.id ||
        null;

      login(token, role, investorId, response.data?.user || null);

      toast.success("Login Successful");

      router.push(getRoleRoute(role));
    } catch (error) {
      console.error(error);

      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md premium-card rounded-3xl p-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black">Welcome Back</h1>

          <p className="text-[var(--muted)] mt-3">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-[var(--muted)] mb-2 block">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
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

          <div>
            <label className="text-sm text-[var(--muted)] mb-2 block">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
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
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-[var(--muted)]">
          Don't have an account?
          <Link href="/register" className="text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
