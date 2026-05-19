import { pool } from "../config/db.js";

import { CreateApiLogDTO } from "../models/apiLog.model.js";

export const createApiLog = async (payload: CreateApiLogDTO) => {
  const query = `
      INSERT INTO api_logs (
        server_name,
        endpoint,
        request_method,
        status_code,
        response_time,
        error_message
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

  const values = [
    payload.server_name,
    payload.endpoint,
    payload.request_method,
    payload.status_code,
    payload.response_time,
    payload.error_message,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllApiLogs = async () => {
  const query = `
      SELECT *
      FROM api_logs
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getApiLogById = async (id: string) => {
  const query = `
      SELECT *
      FROM api_logs
      WHERE id = $1;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getLogsByEndpoint = async (endpoint: string) => {
  const query = `
      SELECT *
      FROM api_logs
      WHERE endpoint = $1
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query, [endpoint]);

  return result.rows;
};

export const getLogsByStatusCode = async (statusCode: number) => {
  const query = `
      SELECT *
      FROM api_logs
      WHERE status_code = $1
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query, [statusCode]);

  return result.rows;
};

export const getFailedApiLogs = async () => {
  const query = `
      SELECT *
      FROM api_logs
      WHERE status_code >= 400
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getSlowApiLogs = async (responseTime: number = 1000) => {
  const query = `
      SELECT *
      FROM api_logs
      WHERE response_time >= $1
      ORDER BY response_time DESC;
    `;

  const result = await pool.query(query, [responseTime]);

  return result.rows;
};

export const getApiAnalytics = async () => {
  const query = `
      SELECT
        COUNT(*) AS total_requests,

        COUNT(*) FILTER (
          WHERE status_code < 400
        ) AS successful_requests,

        COUNT(*) FILTER (
          WHERE status_code >= 400
        ) AS failed_requests,

        COALESCE(
          AVG(response_time),
          0
        ) AS average_response_time

      FROM api_logs;
    `;

  const result = await pool.query(query);

  return result.rows[0];
};

export const deleteApiLog = async (id: string) => {
  const query = `
      DELETE FROM api_logs
      WHERE id = $1
      RETURNING *;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};
