import { Request } from "express";

type ServiceName = "Equity Service" | "Mutual Fund Service";

type ServiceRequestOptions = {
  authHeader?: string;
  body?: unknown;
  method?: string;
};

export class ServiceRequestError extends Error {
  statusCode: number;

  details: unknown;

  constructor(serviceName: ServiceName, statusCode: number, details: unknown) {
    super(`${serviceName} request failed`);

    this.statusCode = statusCode;

    this.details = details;
  }
}

export const getServiceBaseUrl = (
  envKey: "EQUITY_SERVICE_URL" | "MF_SERVICE_URL",
  fallbackUrl: string,
) => {
  return (process.env[envKey] || fallbackUrl).replace(/\/+$/, "");
};

export const requestService = async <T>(
  serviceName: ServiceName,
  url: string,
  options: ServiceRequestOptions = {},
): Promise<T> => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.authHeader) {
    headers.Authorization = options.authHeader;
  }

  let body: string | undefined;

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ServiceRequestError(serviceName, response.status, payload);
  }

  return payload as T;
};

export const getAuthorizationHeader = (req: Request) => {
  const authHeader = req.headers.authorization;

  return Array.isArray(authHeader) ? authHeader[0] : authHeader;
};
