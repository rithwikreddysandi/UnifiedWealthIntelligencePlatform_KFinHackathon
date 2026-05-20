import {
  FaMapMarkerAlt,
  FaTrash,
} from "react-icons/fa";

interface Props {
  property: any;

  onDelete: (
    id: string
  ) => void;
}

export default function PropertyCard({
  property,
  onDelete,
}: Props) {

  return (
    <div
      className="
        glass-card
        rounded-3xl
        p-6
        hover:-translate-y-1
        transition-all
      "
    >

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            {property.property_name}

          </h2>

          <div className="flex items-center gap-2 mt-3 text-[var(--muted)]">

            <FaMapMarkerAlt />

            {property.location}

          </div>

        </div>

        <button
          onClick={() =>
            onDelete(property.id)
          }
          className="
            w-12
            h-12
            rounded-2xl
            bg-red-500/20
            text-red-400
            flex
            items-center
            justify-center
            hover:bg-red-500/30
          "
        >

          <FaTrash />

        </button>

      </div>

      {/* BODY */}

      <div className="mt-8 space-y-4">

        <div>

          <p className="text-sm text-[var(--muted)]">

            Property Type

          </p>

          <h3 className="text-lg font-semibold mt-1">

            {property.property_type}

          </h3>

        </div>

        <div>

          <p className="text-sm text-[var(--muted)]">

            Current Valuation

          </p>

          <h3 className="text-3xl font-black mt-2">

            ₹
            {property.current_valuation?.toLocaleString()}

          </h3>

        </div>

      </div>

    </div>
  );
}