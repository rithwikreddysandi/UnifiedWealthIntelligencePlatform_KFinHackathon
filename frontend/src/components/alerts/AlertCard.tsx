import {
  FaExclamationTriangle,
} from "react-icons/fa";

interface Props {
  alert: any;
}

export default function AlertCard({
  alert,
}: Props) {

  const severityStyles = {
    HIGH:
      "bg-red-500/20 text-red-400",

    MEDIUM:
      "bg-yellow-500/20 text-yellow-400",

    LOW:
      "bg-green-500/20 text-green-400",
  };

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

      <div className="flex items-start justify-between">

        <div className="flex items-start gap-4">

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-red-500/20
              flex
              items-center
              justify-center
            "
          >

            <FaExclamationTriangle className="text-red-400 text-xl" />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              {alert.alert_type}

            </h2>

            <p className="text-[var(--muted)] mt-2 leading-relaxed">

              {alert.message}

            </p>

          </div>

        </div>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold

            ${
              severityStyles[
                alert.severity as keyof typeof severityStyles
              ]
            }
          `}
        >

          {alert.severity}

        </span>

      </div>

    </div>
  );
}