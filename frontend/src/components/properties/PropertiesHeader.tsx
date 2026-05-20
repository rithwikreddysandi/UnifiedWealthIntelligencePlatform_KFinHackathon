import {
  FaPlus,
} from "react-icons/fa";

interface Props {
  openModal: () => void;
}

export default function PropertiesHeader({
  openModal,
}: Props) {

  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
      "
    >

      <div>

        <h1 className="text-4xl font-black">

          Properties

        </h1>

        <p className="text-[var(--muted)] mt-3">

          Real estate portfolio management

        </p>

      </div>

      <button
        onClick={openModal}
        className="
          flex
          items-center
          gap-3
          px-6
          py-4
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          transition-all
          font-semibold
        "
      >

        <FaPlus />

        Add Property

      </button>

    </div>
  );
}