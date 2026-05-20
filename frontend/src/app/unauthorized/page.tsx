import Link from "next/link";

import {
  FaLock,
} from "react-icons/fa";

export default function UnauthorizedPage() {

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center shadow-[var(--shadow)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-500">
          <FaLock className="text-2xl" />
        </div>

        <h1 className="mt-6 text-4xl font-black">
          Unauthorized
        </h1>

        <p className="mt-3 text-[var(--muted)]">
          Your current role does not have access to this workspace.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
