"use client";

import {
  FaSearch,
} from "react-icons/fa";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: Props) {

  return (
    <div
      className="
        glass-card
        rounded-2xl
        px-5
        py-4
        flex
        items-center
        gap-4
      "
    >

      <FaSearch className="text-[var(--muted)]" />

      <input
        type="text"
        placeholder="Search assets, SIPs, properties..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="
          bg-transparent
          outline-none
          w-full
        "
      />

    </div>
  );
}