import Link from "next/link";

export default function NotFoundPage() {

  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="glass-card rounded-3xl p-12 text-center max-w-2xl">

        <h1 className="text-7xl font-black gradient-text">

          404

        </h1>

        <h2 className="text-4xl font-black mt-8">

          Page Not Found

        </h2>

        <p className="text-[var(--muted)] mt-6 leading-relaxed">

          The requested page does not exist in the Unified Wealth Intelligence Platform.

        </p>

        <Link
          href="/dashboard"
          className="
            inline-block
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            transition-all
            font-semibold
          "
        >

          Return Dashboard

        </Link>

      </div>

    </main>
  );
}