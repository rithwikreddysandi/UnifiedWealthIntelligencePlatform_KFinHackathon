import {
  FaDatabase,
} from "react-icons/fa";

interface Props {
  title: string;

  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {

  return (
    <div
      className="
        glass-card
        rounded-3xl
        p-12
        text-center
      "
    >

      <div
        className="
          w-24
          h-24
          rounded-full
          bg-blue-500/20
          flex
          items-center
          justify-center
          mx-auto
        "
      >

        <FaDatabase className="text-4xl text-blue-400" />

      </div>

      <h2 className="text-3xl font-bold mt-8">

        {title}

      </h2>

      <p className="text-[var(--muted)] mt-4 max-w-lg mx-auto">

        {description}

      </p>

    </div>
  );
}