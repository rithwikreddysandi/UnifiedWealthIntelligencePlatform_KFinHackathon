interface Props {
  data: any[];
}

export default function HoldingsTable({
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
                Symbol
              </th>

              <th className="text-left p-5">
                Quantity
              </th>

              <th className="text-left p-5">
                Avg Price
              </th>

              <th className="text-left p-5">
                Current Value
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

                    {item.symbol}

                  </td>

                  <td className="p-5">

                    {item.quantity}

                  </td>

                  <td className="p-5">

                    ₹
                    {item.average_price}

                  </td>

                  <td className="p-5 text-green-500 font-semibold">

                    ₹
                    {item.current_value}

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