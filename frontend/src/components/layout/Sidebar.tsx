"use client";

import Link from "next/link";

import {
  FaChartPie,
  FaWallet,
  FaBuilding,
  FaBell,
  FaServer,
  FaSignOutAlt,
  FaChartLine,
  FaPiggyBank,
  FaBalanceScale,
  FaCogs,
  FaUserTie,
  FaBriefcase,
  FaPlug,
  FaIdBadge,
} from "react-icons/fa";

import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

const investorMenus = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FaChartPie,
  },

  {
    label: "Portfolio",
    href: "/portfolio",
    icon: FaWallet,
  },

  {
    label: "Equities",
    href: "/equities",
    icon: FaChartLine,
  },

  {
    label: "Mutual Funds",
    href: "/mutual-funds",
    icon: FaPiggyBank,
  },

  {
    label: "Properties",
    href: "/properties",
    icon: FaBuilding,
  },

  {
    label: "API Coverage",
    href: "/api-coverage",
    icon: FaPlug,
  },

  {
    label: "Profile",
    href: "/profile",
    icon: FaIdBadge,
  },
];

const roleWorkspaceMenus = [
  {
    label: "Advisor",
    href: "/advisor",
    icon: FaUserTie,
    roles: [
      "ADMIN",
      "ADVISOR",
    ],
  },

  {
    label: "Auditor",
    href: "/auditor",
    icon: FaBalanceScale,
    roles: [
      "ADMIN",
      "AUDITOR",
    ],
  },

  {
    label: "Operations",
    href: "/operations",
    icon: FaCogs,
    roles: [
      "ADMIN",
      "OPERATIONS",
    ],
  },

  {
    label: "Investor",
    href: "/investor",
    icon: FaWallet,
    roles: [
      "ADMIN",
      "INVESTOR",
    ],
  },

  {
    label: "Relationships",
    href: "/relationship-manager",
    icon: FaBriefcase,
    roles: [
      "ADMIN",
      "RELATIONSHIP_MANAGER",
    ],
  },
];

const adminMenus = [
  {
    label: "Admin",
    href: "/admin",
    icon: FaServer,
  },

  {
    label: "Alerts",
    href: "/alerts",
    icon: FaBell,
  },

  {
    label: "Monitoring",
    href: "/monitoring",
    icon: FaServer,
  },
];

interface Props {
  mobileOpen: boolean;

  setMobileOpen: (
    value: boolean
  ) => void;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: Props) {

  const pathname = usePathname();

  const { logout, role } = useAuth();

  const router = useRouter();

  const handleLogout = () => {

    logout();

    router.push("/login");
  };

  const menuItems =
    [
      ...roleWorkspaceMenus.filter(
        (item) =>
          item.roles.includes(
            role || "INVESTOR"
          )
      ),
      ...investorMenus,
      ...(role === "ADMIN" ||
      role === "AUDITOR" ||
      role === "OPERATIONS"
        ? adminMenus
        : []),
    ];

  return (
    <>
      {/* OVERLAY */}

      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[280px]
          bg-[var(--sidebar)]
          backdrop-blur-xl
          border-r
          border-[var(--card-border)]
          z-50
          transition-all
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* LOGO */}

        <div className="h-20 flex items-center px-8 border-b border-[var(--card-border)]">

          <h1 className="text-2xl font-black">

            Wealth
            <span className="gradient-text">
              IQ
            </span>

          </h1>

        </div>

        {/* MENUS */}

        <div className="p-6 space-y-3">

          {menuItems.map(
            (item) => {

              const Icon =
                item.icon;

              const active =
                pathname ===
                item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className={`
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-xl
                    transition-all
                    font-medium

                    ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "hover:bg-[var(--card)] text-[var(--muted)]"
                    }
                  `}
                >

                  <Icon className="text-lg" />

                  {item.label}

                </Link>
              );
            }
          )}

        </div>

        {/* LOGOUT */}

        <div className="absolute bottom-8 left-0 w-full px-6">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              py-4
              rounded-xl
              bg-red-500/20
              text-red-400
              hover:bg-red-500/30
              transition-all
            "
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}
