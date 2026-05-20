"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import { apiGet } from "@/services/apiClient";

export default function ProfilePage() {

  const {
    user,
    role,
    investorId,
  } = useAuth();

  const [investor, setInvestor] =
    useState<any>(null);

  useEffect(() => {

    const loadInvestor =
      async () => {

        if (!investorId) {
          return;
        }

        const response =
          await apiGet(
            `/investors/${investorId}`
          );

        if (response.ok) {
          setInvestor(response.data);
        }
      };

    loadInvestor();

  }, [investorId]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-7 shadow-[var(--shadow)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-3xl text-white shadow-lg">
              <FaUser />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-500">
                Profile
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight">
                {user?.full_name || investor?.full_name || "User Profile"}
              </h1>

              <p className="mt-2 text-[var(--muted)]">
                {role || "Platform role"} access profile
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/60 px-5 py-4 text-sm">
            Investor ID:{" "}
            <span className="font-mono text-[var(--muted)]">
              {investorId || "Not linked"}
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {[
          ["Full name", user?.full_name || investor?.full_name, FaUser],
          ["Email", user?.email || investor?.email, FaEnvelope],
          ["Phone", investor?.phone, FaPhone],
          ["PAN", investor?.pan_number, FaIdCard],
          ["Risk profile", investor?.risk_profile, FaIdCard],
          ["Status", investor?.status, FaIdCard],
        ].map(([label, value, Icon]: any) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
                <Icon />
              </div>

              <div>
                <p className="text-sm text-[var(--muted)]">
                  {label}
                </p>

                <p className="mt-1 font-black">
                  {value || "Not available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
