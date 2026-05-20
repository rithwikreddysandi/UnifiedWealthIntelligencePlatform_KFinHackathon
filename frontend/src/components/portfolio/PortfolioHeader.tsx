interface Props {
  totalWealth: number;
}

export default function PortfolioHeader({
  totalWealth,
}: Props) {

  return (
    <div
      className="
        glass-card
        rounded-3xl
        p-8
      "
    >

      <p className="text-[var(--muted)]">

        Total Portfolio Value

      </p>

      <h1 className="text-5xl font-black mt-4">

        ₹
        {totalWealth.toLocaleString()}

      </h1>

    </div>
  );
}