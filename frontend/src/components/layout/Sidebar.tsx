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
  FaShieldAlt,
  FaIdBadge,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: Props) {
  const pathname = usePathname();

  const router = useRouter();

  const { logout, role } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const investorMenus = [
    {
      label: "Dashboard",
      href: "/investor/dashboard",
      icon: FaChartPie,
    },
    {
      label: "Portfolio",
      href: "/investor/portfolio",
      icon: FaWallet,
    },
    {
      label: "Equities",
      href: "/investor/equities",
      icon: FaChartLine,
    },
    {
      label: "Mutual Funds",
      href: "/investor/mutual-funds",
      icon: FaPiggyBank,
    },
    {
      label: "Properties",
      href: "/investor/properties",
      icon: FaBuilding,
    },
    {
      label: "Profile",
      href: "/investor/profile",
      icon: FaIdBadge,
    },
  ];

  const operationsMenus = [
    {
      label: "Dashboard",
      href: "/operations/dashboard",
      icon: FaChartPie,
    },
    {
      label: "Transaction Review",
      href: "/operations/transaction-review",
      icon: FaClipboardCheck,
    },
    {
      label: "Investor Verification",
      href: "/operations/investor-verification",
      icon: FaUsers,
    },
    {
      label: "Escalations",
      href: "/operations/escalation-center",
      icon: FaExclamationTriangle,
    },
  ];

  const complianceMenus = [
    {
      label: "Dashboard",
      href: "/compliance/dashboard",
      icon: FaChartPie,
    },
    {
      label: "Monitoring",
      href: "/compliance/monitoring",
      icon: FaServer,
    },
    {
      label: "Audit Logs",
      href: "/compliance/audit-logs",
      icon: FaShieldAlt,
    },
    {
      label: "AML Review",
      href: "/compliance/aml-review",
      icon: FaClipboardCheck,
    },
  ];

  const adminMenus = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: FaChartPie,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: FaUsers,
    },
    {
      label: "Roles",
      href: "/admin/roles",
      icon: FaShieldAlt,
    },
    {
      label: "Alerts",
      href: "/admin/alerts",
      icon: FaBell,
    },
    {
      label: "Monitoring",
      href: "/admin/monitoring",
      icon: FaServer,
    },
  ];

  let menuItems: {
    label: string;
    href: string;
    icon: any;
  }[] = [];

  switch (role) {
    case "INVESTOR":
      menuItems = investorMenus;
      break;

    case "OPERATIONS":
      menuItems = operationsMenus;
      break;

    case "COMPLIANCE":
      menuItems = complianceMenus;
      break;

    case "ADMIN":
      menuItems = adminMenus;
      break;

    default:
      menuItems = investorMenus;
  }

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

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

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        <div className="h-20 flex items-center px-8 border-b border-[var(--card-border)]">
          <h1 className="text-2xl font-black">
            Wealth
            <span className="gradient-text">IQ</span>
          </h1>
        </div>

        <div className="p-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
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
          })}
        </div>

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
