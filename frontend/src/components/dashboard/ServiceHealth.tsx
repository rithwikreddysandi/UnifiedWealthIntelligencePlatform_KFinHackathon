import {
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

interface Props {
  services: {
    name: string;

    status: string;
  }[];
}

export default function ServiceHealth({
  services,
}: Props) {

  return (
    <div className="glass-card rounded-3xl p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Service Health

        </h2>

        <p className="text-[var(--muted)] mt-2">

          Backend service monitoring

        </p>

      </div>

      <div className="space-y-4">

        {services.map(
          (service, index) => (

            <div
              key={`${service.name}-${index}`}
              className="
                flex
                items-center
                justify-between
                p-4
                rounded-2xl
                bg-black/10
              "
            >

              <p className="font-medium">

                {service.name}

              </p>

              <div className="flex items-center gap-2">

                {service.status ===
                "UP" ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}

                <span
                  className={
                    service.status ===
                    "UP"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {service.status}
                </span>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}