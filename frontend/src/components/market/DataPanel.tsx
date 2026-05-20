"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function DataPanel({
  title,
  subtitle,
  children,
}: Props) {

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/70 p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-black">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}
