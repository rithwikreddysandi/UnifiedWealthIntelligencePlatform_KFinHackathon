export enum SipFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
}

export enum SipStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  FAILED = "FAILED",
  CLOSED = "CLOSED",
}

export enum MfTransactionType {
  PURCHASE = "PURCHASE",
  REDEEM = "REDEEM",
  SWITCH = "SWITCH",
  STP = "STP",
  SWP = "SWP",
}

export enum MandateStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum InvestorStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum AlertSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum AlertStatus {
  OPEN = "OPEN",
  RESOLVED = "RESOLVED",
  DISMISSED = "DISMISSED",
}

export enum OrderStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}
