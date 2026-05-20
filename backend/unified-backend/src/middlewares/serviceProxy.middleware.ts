import {
  Request,
  Response,
  NextFunction,
} from "express";

import { getServiceBaseUrl } from "../integrations/serviceHttp.client.js";

type ServiceProxyOptions = {
  envKey: "EQUITY_SERVICE_URL" | "MF_SERVICE_URL";
  fallbackUrl: string;
  servicePathPrefix: string;
};

const blockedForwardHeaders = new Set([
  "connection",
  "content-length",
  "host",
]);

const buildForwardHeaders = (req: Request) => {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (blockedForwardHeaders.has(key.toLowerCase()) || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item));
      return;
    }

    headers.set(key, value);
  });

  if (req.body && Object.keys(req.body).length > 0 && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return headers;
};

export const createServiceProxy =
  (options: ServiceProxyOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseUrl = getServiceBaseUrl(options.envKey, options.fallbackUrl);
      const servicePath = `${options.servicePathPrefix}${req.url}`;
      const targetUrl = `${baseUrl}${servicePath}`;
      const method = req.method.toUpperCase();
      const hasBody = !["GET", "HEAD"].includes(method) && req.body !== undefined;

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 5000);

      const response = await fetch(targetUrl, {
        method,
        headers: buildForwardHeaders(req),
        body: hasBody ? JSON.stringify(req.body) : undefined,
        signal:controller.signal
      });

      clearTimeout(timeout);
      res.status(response.status);

      response.headers.forEach((value, key) => {
        if (!blockedForwardHeaders.has(key.toLowerCase())) {
          res.setHeader(key, value);
        }
      });

      const body = Buffer.from(await response.arrayBuffer());

      return res.send(body);
    } catch (error) {
      return next(error);
    }
  };
