import * as apiLogRepository from "../repositories/apiLog.repository.js";

import { SERVER_NAME } from "../utils/constants.js";

export interface ApiLogPayload {
  endpoint: string;

  request_method?: string;

  status_code?: number;

  response_time?: number;

  error_message?: string;
}

export const createApiLog = async (payload: ApiLogPayload) => {
  return await apiLogRepository.createApiLog({
    server_name: SERVER_NAME,
    endpoint: payload.endpoint,
    request_method: payload.request_method,
    status_code: payload.status_code,
    response_time: payload.response_time,
    error_message: payload.error_message,
  });
};

export const getAllApiLogs = async () => {
  return await apiLogRepository.getAllApiLogs();
};

export const getApiLogById = async (id: string) => {
  return await apiLogRepository.getApiLogById(id);
};

export const getLogsByEndpoint = async (endpoint: string) => {
  return await apiLogRepository.getLogsByEndpoint(endpoint);
};

export const getLogsByStatusCode = async (statusCode: number) => {
  return await apiLogRepository.getLogsByStatusCode(statusCode);
};

export const getFailedApiLogs = async () => {
  return await apiLogRepository.getFailedApiLogs();
};

export const getSlowApiLogs = async (responseTime: number = 1000) => {
  return await apiLogRepository.getSlowApiLogs(responseTime);
};

export const getApiAnalytics = async () => {
  return await apiLogRepository.getApiAnalytics();
};

export const logSuccessRequest = async (
  endpoint: string,
  requestMethod: string,
  statusCode: number,
  responseTime: number,
) => {
  return await createApiLog({
    endpoint,
    request_method: requestMethod,
    status_code: statusCode,
    response_time: responseTime,
  });
};

export const logFailedRequest = async (
  endpoint: string,
  requestMethod: string,
  statusCode: number,
  errorMessage: string,
  responseTime: number,
) => {
  return await createApiLog({
    endpoint,
    request_method: requestMethod,
    status_code: statusCode,
    response_time: responseTime,
    error_message: errorMessage,
  });
};

export const logExternalServiceFailure = async (
  endpoint: string,
  errorMessage: string,
) => {
  return await createApiLog({
    endpoint,
    request_method: "EXTERNAL",
    status_code: 500,
    response_time: 0,
    error_message: errorMessage,
  });
};

export const deleteApiLog = async (id: string) => {
  const existingLog = await apiLogRepository.getApiLogById(id);

  if (!existingLog) {
    throw new Error("API log not found");
  }

  return await apiLogRepository.deleteApiLog(id);
};
