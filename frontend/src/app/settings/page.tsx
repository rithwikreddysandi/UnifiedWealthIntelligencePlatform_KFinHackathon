"use client";

import ThemeToggle from "@/components/ui/theme-toggle";

export default function SettingsPage() {

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black">

          Settings

        </h1>

        <p className="text-[var(--muted)] mt-3">

          Manage your preferences and platform settings

        </p>

      </div>

      {/* SETTINGS CARDS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* THEME */}

        <div className="glass-card rounded-3xl p-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Appearance

              </h2>

              <p className="text-[var(--muted)] mt-2">

                Toggle light and dark mode

              </p>

            </div>

            <ThemeToggle />

          </div>

        </div>

        {/* SECURITY */}

        <div className="glass-card rounded-3xl p-8">

          <h2 className="text-2xl font-bold">

            Security

          </h2>

          <p className="text-[var(--muted)] mt-2">

            JWT authentication enabled

          </p>

          <div className="mt-6">

            <span
              className="
                px-4
                py-2
                rounded-full
                bg-green-500/20
                text-green-400
              "
            >

              Secure Session Active

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}