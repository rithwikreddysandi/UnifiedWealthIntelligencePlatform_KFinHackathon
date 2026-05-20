import {
  FaCheckCircle,
  FaTimesCircle,
  FaServer,
} from "react-icons/fa";

interface Props {
  service: any;
}

export default function ServiceCard({
  service,
}: Props) {

  const isUp =
    service.status === "UP";

  return (
    <div
      className="
        glass-card
        rounded-3xl
        p-6
      "
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className={`
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center

              ${
                isUp
                  ? "bg-green-500/20"
                  : "bg-red-500/20"
              }
            `}
          >

            <FaServer
              className={`
                text-2xl

                ${
                  isUp
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              {service.service}

            </h2>

            <p className="text-[var(--muted)] mt-1">

              Operational monitoring

            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          {isUp ? (
            <FaCheckCircle className="text-green-400 text-xl" />
          ) : (
            <FaTimesCircle className="text-red-400 text-xl" />
          )}

          <span
            className={`
              font-semibold

              ${
                isUp
                  ? "text-green-400"
                  : "text-red-400"
              }
            `}
          >

            {service.status}

          </span>

        </div>

      </div>

    </div>
  );
}