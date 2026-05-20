import Link from "next/link";

export default function UnauthorizedPage() {

  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="glass-card rounded-3xl p-12 text-center max-w-xl">

        <h1 className="text-6xl font-black text-red-500">

          403

        </h1>

        <h2 className="text-3xl font-bold mt-6">

          Unauthorized Access

        </h2>

        <p className="text-[var(--muted)] mt-4 leading-relaxed">

          You do not have permission to access this module.

        </p>

        <Link
          href="/dashboard"
          className="
            inline-block
            mt-8
            px-8
            py-4
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            transition-all
            font-semibold
          "
        >

          Go Back

        </Link>

      </div>

    </main>
  );
}