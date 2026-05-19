export const SERVER_NAME = "MUTUAL_FUND_SERVICE";

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 10;

export const MAX_LIMIT = 100;

export const CACHE_KEYS = {
  ALL_FUNDS: "ALL_FUNDS",
  FUND_BY_ID: "FUND_BY_ID",
  NAV_HISTORY: "NAV_HISTORY",
  INVESTOR_HOLDINGS: "INVESTOR_HOLDINGS",
};

export const CACHE_EXPIRY = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
};

export const API_MESSAGES = {
  // FUND
  FUND_CREATED: "Fund created successfully",
  FUND_UPDATED: "Fund updated successfully",
  FUND_DELETED: "Fund deleted successfully",
  FUND_FETCHED: "Fund fetched successfully",
  FUNDS_FETCHED: "Funds fetched successfully",
  FUND_NOT_FOUND: "Fund not found",

  // SIP
  SIP_CREATED: "SIP created successfully",
  SIP_UPDATED: "SIP updated successfully",
  SIP_FETCHED: "SIP fetched successfully",
  SIP_NOT_FOUND: "SIP not found",

  // TRANSACTION
  TRANSACTION_CREATED: "Transaction created successfully",
  TRANSACTION_FETCHED: "Transaction fetched successfully",

  // HOLDINGS
  HOLDINGS_FETCHED: "Holdings fetched successfully",

  // ALERTS
  ALERT_CREATED: "Alert created successfully",

  // COMMON
  INTERNAL_SERVER_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation error",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden access",
};

export const HTTP_STATUS = {
  OK: 200,

  CREATED: 201,

  BAD_REQUEST: 400,

  UNAUTHORIZED: 401,

  FORBIDDEN: 403,

  NOT_FOUND: 404,

  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
};
