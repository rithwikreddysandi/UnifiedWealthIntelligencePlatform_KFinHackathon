import {
  FaBalanceScale,
  FaBriefcase,
  FaChartLine,
  FaClipboardCheck,
  FaCogs,
  FaShieldAlt,
  FaUserTie,
  FaWallet,
} from "react-icons/fa";

export type RoleName =
  | "ADMIN"
  | "ADVISOR"
  | "AUDITOR"
  | "OPERATIONS"
  | "INVESTOR"
  | "RELATIONSHIP_MANAGER";

export const ROLES = [
  {
    name: "ADMIN",
    title: "Admin Command Center",
    description: "Full system access",
    accent: "blue",
    icon: FaShieldAlt,
    route: "/admin",
  },
  {
    name: "ADVISOR",
    title: "Advisor Workspace",
    description: "Wealth advisory access",
    accent: "emerald",
    icon: FaUserTie,
    route: "/advisor",
  },
  {
    name: "AUDITOR",
    title: "Audit and Compliance",
    description: "Audit and compliance visibility",
    accent: "amber",
    icon: FaBalanceScale,
    route: "/auditor",
  },
  {
    name: "OPERATIONS",
    title: "Operations Console",
    description: "Operational monitoring and workflows",
    accent: "cyan",
    icon: FaCogs,
    route: "/operations",
  },
  {
    name: "INVESTOR",
    title: "Investor Platform",
    description: "Investor platform access",
    accent: "violet",
    icon: FaWallet,
    route: "/investor",
  },
  {
    name: "RELATIONSHIP_MANAGER",
    title: "Relationship Manager",
    description: "Investor relationship management",
    accent: "rose",
    icon: FaBriefcase,
    route: "/relationship-manager",
  },
];

export const roleMetrics = {
  ADMIN: [
    ["Users", "1,284", "Role controlled identities"],
    ["Services", "3/3", "Unified, equity, mutual fund"],
    ["Alerts", "12", "Open operational alerts"],
    ["Audit Events", "8,421", "Tracked platform actions"],
  ],
  ADVISOR: [
    ["Clients", "248", "Assigned advisory households"],
    ["AUM", "INR 84.2Cr", "Advisory book value"],
    ["Reviews Due", "19", "Risk and allocation reviews"],
    ["Opportunities", "34", "Rebalance candidates"],
  ],
  AUDITOR: [
    ["Audit Logs", "8,421", "Traceable system actions"],
    ["Exceptions", "7", "Compliance exceptions"],
    ["API Logs", "12,480", "Service request trail"],
    ["Controls", "96%", "Policy coverage"],
  ],
  OPERATIONS: [
    ["Queues", "6", "Active workflow queues"],
    ["Pending Orders", "42", "Settlement and execution"],
    ["Mandates", "18", "Bank mandate follow-ups"],
    ["SIP Failures", "5", "Retry or support needed"],
  ],
  INVESTOR: [
    ["Total Wealth", "INR 1.84Cr", "Across all assets"],
    ["Equities", "INR 62.4L", "Listed holdings"],
    ["Mutual Funds", "INR 74.8L", "Fund portfolio"],
    ["Real Estate", "INR 47.2L", "Property assets"],
  ],
  RELATIONSHIP_MANAGER: [
    ["Investor Accounts", "312", "Mapped relationships"],
    ["Follow-ups", "28", "Open service tasks"],
    ["Risk Changes", "11", "Profile updates to review"],
    ["SLA Health", "94%", "Relationship desk adherence"],
  ],
} satisfies Record<RoleName, string[][]>;

export const roleWorkflows = {
  ADMIN: [
    "Manage roles, users, permissions, and API clients.",
    "Monitor service health, audit logs, and high-severity alerts.",
    "Coordinate cross-service recovery across unified, equity, and mutual fund backends.",
  ],
  ADVISOR: [
    "Review investor risk profiles before recommending allocation changes.",
    "Compare equity, mutual fund, SIP, and property exposure.",
    "Prepare advisory actions for relationship managers and investors.",
  ],
  AUDITOR: [
    "Inspect audit logs, API logs, and service event history.",
    "Track exceptions by module, user, service, and severity.",
    "Validate that sensitive workflows remain traceable and compliant.",
  ],
  OPERATIONS: [
    "Watch settlement, order, SIP, mandate, and service health queues.",
    "Prioritize failed transactions and delayed SIP processing.",
    "Route incidents to the right sub-service through the unified backend.",
  ],
  INVESTOR: [
    "View consolidated wealth across equities, mutual funds, SIPs, and properties.",
    "Track alerts, portfolio movement, and upcoming investment activity.",
    "Manage profile, risk preference, and linked assets.",
  ],
  RELATIONSHIP_MANAGER: [
    "Track investor onboarding, support cases, and follow-up tasks.",
    "Coordinate with advisors on portfolio reviews and suitability checks.",
    "Maintain service quality across assigned investor relationships.",
  ],
} satisfies Record<RoleName, string[]>;

export const roleToneClasses: Record<string, string> = {
  blue: "from-blue-600/20 to-slate-500/10 text-blue-500 border-blue-500/20",
  emerald: "from-emerald-600/20 to-cyan-500/10 text-emerald-500 border-emerald-500/20",
  amber: "from-amber-500/20 to-slate-500/10 text-amber-500 border-amber-500/20",
  cyan: "from-cyan-600/20 to-blue-500/10 text-cyan-500 border-cyan-500/20",
  violet: "from-violet-600/20 to-blue-500/10 text-violet-500 border-violet-500/20",
  rose: "from-rose-600/20 to-slate-500/10 text-rose-500 border-rose-500/20",
};

export const roleIconToneClasses: Record<string, string> = {
  blue: "bg-blue-600 text-white",
  emerald: "bg-emerald-600 text-white",
  amber: "bg-amber-500 text-white",
  cyan: "bg-cyan-600 text-white",
  violet: "bg-violet-600 text-white",
  rose: "bg-rose-600 text-white",
};
