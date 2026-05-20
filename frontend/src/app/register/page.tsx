"use client";

import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaIdCard,
} from "react-icons/fa";

import Link from "next/link";

import toast from "react-hot-toast";

import { useState } from "react";

import ThemeToggle from "@/components/ui/theme-toggle";

import { registerUser } from "@/services/auth.service";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/config/roles";

export default function RegisterPage() {

  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      password: "",
      phone: "",
      pan_number: "",
      dob: "",
      risk_profile:
        "MODERATE",
    });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
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
          await registerUser(
            formData
          );

        if (!response.success) {

          toast.error(
            response.message
          );

          return;
        }

        const token =
          response.data?.token;

        const role =
          response.data?.user?.role ||
          "INVESTOR";

        const investorId =
          response.data?.investor?.id ||
          response.data?.investor?.investor_id ||
          null;

        if (token) {
          login(
            token,
            role,
            investorId,
            response.data?.user || null
          );
        }

        toast.success(
          "Registration Successful"
        );

        const roleRoute =
          ROLES.find(
            (item) =>
              item.name === role
          )?.route || "/dashboard";

        router.push(roleRoute);

      } catch (error) {

        toast.error(
          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">

      {/* BG */}

      <div className="absolute top-6 right-6">

        <ThemeToggle />

      </div>

      <div className="w-full max-w-3xl premium-card rounded-3xl p-10 relative z-10">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-black">

            Create Account

          </h1>

          <p className="text-[var(--muted)] mt-3">

            Register your investor profile

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* FULL NAME */}

          <div className="relative">

            <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              name="full_name"
              value={
                formData.full_name
              }
              onChange={
                handleChange
              }
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 input-shell"
            />

          </div>

          {/* EMAIL */}

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
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 input-shell"
            />

          </div>

          {/* PASSWORD */}

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
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 input-shell"
            />

          </div>

          {/* PHONE */}

          <div className="relative">

            <FaPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              placeholder="Phone"
              className="w-full pl-12 pr-4 py-4 input-shell"
            />

          </div>

          {/* PAN */}

          <div className="relative">

            <FaIdCard className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              name="pan_number"
              value={
                formData.pan_number
              }
              onChange={
                handleChange
              }
              placeholder="PAN Number"
              className="w-full pl-12 pr-4 py-4 input-shell"
            />

          </div>

          {/* DOB */}

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-4 input-shell"
          />

          {/* RISK */}

          <select
            name="risk_profile"
            value={
              formData.risk_profile
            }
            onChange={handleChange}
            className="md:col-span-2 w-full px-4 py-4 input-shell"
          >
            <option value="LOW">
              LOW
            </option>

            <option value="MODERATE">
              MODERATE
            </option>

            <option value="HIGH">
              HIGH
            </option>

          </select>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              md:col-span-2
              py-4
              rounded-xl
              btn-primary
              font-semibold
              text-lg
              transition-all
              hover:scale-[1.01]
            "
          >
            {loading
              ? "Please wait..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-8 text-[var(--muted)]">

          Already have an account?

          <Link
            href="/login"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </main>
  );
}
