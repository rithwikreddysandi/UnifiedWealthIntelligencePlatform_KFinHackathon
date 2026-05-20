import Link from "next/link";

import {
  FaChartLine,
  FaShieldAlt,
  FaWallet,
  FaChartPie,
} from "react-icons/fa";

import ThemeToggle from "@/components/ui/theme-toggle";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* BACKGROUND GRADIENTS */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />

      {/* HEADER */}

      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">

        <h1 className="text-2xl font-bold">
          Wealth<span className="gradient-text">IQ</span>
        </h1>

        <ThemeToggle />

      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">

            <FaChartLine className="text-blue-500" />

            <span className="text-sm text-[var(--muted)]">
              Enterprise Operational Wealth Platform
            </span>

          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight max-w-6xl mx-auto">

            Unified Wealth
            <span className="gradient-text">
              {" "}Intelligence{" "}
            </span>
            Platform

          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-xl text-[var(--muted)] leading-relaxed">

            Centralized multi-asset wealth management platform integrating equities, mutual funds, SIPs, and real estate with operational monitoring and intelligent analytics.

          </p>

          <div className="flex items-center justify-center gap-6 mt-14 flex-wrap">

            <Link
              href="/login"
              className="
                px-8
                py-4
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                text-lg
                shadow-2xl
                hover:scale-105
                transition-all
              "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
                px-8
                py-4
                rounded-2xl
                glass-card
                font-semibold
                text-lg
                hover:scale-105
                transition-all
              "
            >
              Register
            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all">

            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">

              <FaWallet className="text-blue-500 text-3xl" />

            </div>

            <h2 className="text-2xl font-bold mb-4">
              Multi Asset Portfolio
            </h2>

            <p className="text-[var(--muted)] leading-relaxed">

              Unified view of equities, mutual funds, SIPs, and real estate investments.

            </p>

          </div>

          <div className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all">

            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">

              <FaChartPie className="text-green-500 text-3xl" />

            </div>

            <h2 className="text-2xl font-bold mb-4">
              Smart Analytics
            </h2>

            <p className="text-[var(--muted)] leading-relaxed">

              Real-time operational intelligence and advanced wealth analytics dashboard.

            </p>

          </div>

          <div className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition-all">

            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">

              <FaShieldAlt className="text-red-500 text-3xl" />

            </div>

            <h2 className="text-2xl font-bold mb-4">
              Enterprise Security
            </h2>

            <p className="text-[var(--muted)] leading-relaxed">

              JWT authentication, RBAC authorization, and distributed system resilience.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}