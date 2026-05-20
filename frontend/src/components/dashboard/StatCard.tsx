"use client";

import { IconType } from "react-icons";

import { motion } from "framer-motion";

interface Props {
  title: string;

  value: string;

  icon: IconType;

  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      whileHover={{
        y: -6,
      }}

      className="
        glass-card
        rounded-3xl
        p-6
        relative
        overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className={`
          absolute
          -top-10
          -right-10
          w-32
          h-32
          rounded-full
          opacity-20
          blur-3xl
          ${color}
        `}
      />

      {/* CONTENT */}

      <div className="relative z-10 flex items-center justify-between">

        {/* LEFT */}

        <div>

          <p className="text-sm text-[var(--muted)] font-medium">

            {title}

          </p>

          <h2 className="text-4xl font-black mt-4 tracking-tight">

            {value}

          </h2>

        </div>

        {/* ICON */}

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-xl
            ${color}
          `}
        >

          <Icon className="text-3xl text-white" />

        </div>

      </div>

    </motion.div>
  );
}