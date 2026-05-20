"use client";

import { IconType } from "react-icons";

interface Props {
  title: string;
  value: string | number;
  icon: IconType;
  tone: string;
}

export default function MetricTile({
  title,
  value,
  icon: Icon,
  tone,
}: Props) {

  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/70 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">
            {title}
          </p>

          <p className="mt-3 text-3xl font-black tracking-tight">
            {value}
          </p>
        </div>

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg ${tone}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}
