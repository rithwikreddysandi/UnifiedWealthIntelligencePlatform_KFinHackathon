const transactions = [
  {
    type: "BUY",
    asset: "RELIANCE",
    amount: "₹50,000",
  },

  {
    type: "SIP",
    asset: "Axis Bluechip",
    amount: "₹10,000",
  },

  {
    type: "PROPERTY",
    asset: "Villa Investment",
    amount: "₹25,00,000",
  },
];

export default function RecentTransactions() {

  return (
    <div
      className="
        glass-card
        rounded-3xl
        p-6
      "
    >

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Recent Transactions

        </h2>

        <p className="text-[var(--muted)] mt-2">

          Latest operational activities

        </p>

      </div>

      <div className="space-y-4">

        {transactions.map(
          (transaction, index) => (

            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                p-4
                rounded-2xl
                border
                border-[var(--card-border)]
              "
            >

              <div>

                <h3 className="font-semibold">

                  {transaction.asset}

                </h3>

                <p className="text-sm text-[var(--muted)] mt-1">

                  {transaction.type}

                </p>

              </div>

              <h3 className="font-bold text-green-400">

                {transaction.amount}

              </h3>

            </div>
          )
        )}

      </div>

    </div>
  );
}