import { FaShieldAlt, FaCogs, FaWallet, FaBalanceScale } from "react-icons/fa";

export type RoleName = "ADMIN" | "OPERATIONS" | "COMPLIANCE" | "INVESTOR";

export const ROLES = [
  {
    name: "ADMIN",
    title: "Admin Command Center",
    description: "Full system administration and platform governance",
    accent: "blue",
    icon: FaShieldAlt,
    route: "/admin",
  },

  {
    name: "OPERATIONS",
    title: "Operations Console",
    description: "Transaction review, investor verification and escalations",
    accent: "cyan",
    icon: FaCogs,
    route: "/operations",
  },

  {
    name: "COMPLIANCE",
    title: "Compliance Workspace",
    description: "Audit visibility, AML monitoring and compliance workflows",
    accent: "amber",
    icon: FaBalanceScale,
    route: "/compliance",
  },

  {
    name: "INVESTOR",
    title: "Investor Platform",
    description: "Portfolio management and wealth monitoring",
    accent: "violet",
    icon: FaWallet,
    route: "/investor",
  },
] as const;

export const roleMetrics = {
  ADMIN: [
    ["Users", "1,284", "Managed platform users"],
    ["Services", "4/4", "Healthy backend services"],
    ["Alerts", "12", "Open operational alerts"],
    ["Audit Events", "8,421", "Tracked platform actions"],
  ],

  OPERATIONS: [
    ["Pending Reviews", "42", "Transactions awaiting review"],
    ["Verifications", "18", "Investor KYC checks"],
    ["Escalations", "7", "Open operational escalations"],
    ["Queues", "6", "Active workflow queues"],
  ],

  COMPLIANCE: [
    ["Audit Logs", "8,421", "Traceable system actions"],
    ["AML Reviews", "31", "Pending AML investigations"],
    ["Exceptions", "7", "Compliance exceptions"],
    ["Policy Coverage", "96%", "Control effectiveness"],
  ],

  INVESTOR: [
    ["Total Wealth", "INR 1.84Cr", "Across all assets"],
    ["Equities", "INR 62.4L", "Listed holdings"],
    ["Mutual Funds", "INR 74.8L", "Fund portfolio"],
    ["Real Estate", "INR 47.2L", "Property assets"],
  ],
} satisfies Record<RoleName, string[][]>;

export const roleWorkflows = {
  ADMIN: [
    "Manage users, roles and platform permissions.",
    "Monitor platform health and service availability.",
    "Review system-wide alerts and operational risks.",
    "Maintain governance across all financial services.",
  ],

  OPERATIONS: [
    "Review equity and mutual fund transactions.",
    "Verify investor onboarding and KYC activities.",
    "Handle escalations and operational exceptions.",
    "Track workflow queues and service bottlenecks.",
  ],

  COMPLIANCE: [
    "Review AML and compliance alerts.",
    "Inspect audit logs and user activities.",
    "Investigate compliance exceptions.",
    "Ensure regulatory adherence across services.",
  ],

  INVESTOR: [
    "Monitor consolidated wealth and investments.",
    "Track portfolio allocation and performance.",
    "View mutual fund, equity and property holdings.",
    "Manage profile information and investment preferences.",
  ],
} satisfies Record<RoleName, string[]>;

export const roleToneClasses: Record<string, string> = {
  blue: "from-blue-600/20 to-slate-500/10 text-blue-500 border-blue-500/20",

  cyan: "from-cyan-600/20 to-blue-500/10 text-cyan-500 border-cyan-500/20",

  amber: "from-amber-500/20 to-slate-500/10 text-amber-500 border-amber-500/20",

  violet:
    "from-violet-600/20 to-blue-500/10 text-violet-500 border-violet-500/20",
};

export const roleIconToneClasses: Record<string, string> = {
  blue: "bg-blue-600 text-white",

  cyan: "bg-cyan-600 text-white",

  amber: "bg-amber-500 text-white",

  violet: "bg-violet-600 text-white",
};
