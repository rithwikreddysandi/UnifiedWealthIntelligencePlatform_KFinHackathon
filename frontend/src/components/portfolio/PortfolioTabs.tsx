interface Props {
  activeTab: string;

  setActiveTab: (
    tab: string
  ) => void;
}

const tabs = [
  "equities",
  "mutualFunds",
  "sips",
  "properties",
];

export default function PortfolioTabs({
  activeTab,
  setActiveTab,
}: Props) {

  return (
    <div className="flex flex-wrap gap-4">

      {tabs.map((tab) => (

        <button
          key={tab}
          onClick={() =>
            setActiveTab(tab)
          }
          className={`
            px-6
            py-3
            rounded-2xl
            capitalize
            transition-all

            ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "glass-card"
            }
          `}
        >

          {tab}

        </button>
      ))}

    </div>
  );
}