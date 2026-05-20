interface Props {
  data: any[];
}

export default function SIPTable({
  data,
}: Props) {

  return (
    <div
      className="
        glass-card
        rounded-3xl
        overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-black/10">

            <tr>

              <th className="text-left p-5">
                Fund
              </th>

              <th className="text-left p-5">
                Amount
              </th>

              <th className="text-left p-5">
                Frequency
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map(
              (item, index) => (

                <tr
                  key={index}
                  className="
                    border-t
                    border-[var(--card-border)]
                  "
                >

                  <td className="p-5 font-semibold">

                    {item.fund_name}

                  </td>

                  <td className="p-5">

                    ₹
                    {item.amount}

                  </td>

                  <td className="p-5">

                    {item.frequency}

                  </td>

                  <td className="p-5">

                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-green-500/20
                        text-green-400
                      "
                    >

                      {item.status}

                    </span>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}