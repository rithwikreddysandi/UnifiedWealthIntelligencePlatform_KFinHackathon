interface Props {
  alerts: {
    title: string;

    severity: string;
  }[];
}

export default function AlertsPanel({
  alerts,
}: Props) {

  return (
    <div className="glass-card rounded-3xl p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Recent Alerts

        </h2>

        <p className="text-[var(--muted)] mt-2">

          Operational notifications

        </p>

      </div>

      <div className="space-y-4">

        {alerts.map(
          (alert, index) => (

            <div
              key={index}
              className="
                p-4
                rounded-2xl
                border
                border-[var(--card-border)]
              "
            >

              <div className="flex items-center justify-between">

                <p className="font-medium">

                  {alert.title}

                </p>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm

                    ${
                      alert.severity ===
                      "HIGH"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                >

                  {alert.severity}

                </span>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}