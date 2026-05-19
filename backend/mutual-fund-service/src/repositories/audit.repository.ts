import { pool } from "../config/db.js";

export interface CreateAuditLogDTO {
  server_name: string;

  user_id?: string;

  action: string;

  module?: string;

  entity_id?: string;

  old_value?: any;

  new_value?: any;

  ip_address?: string;
}

export const createAuditLog = async (payload: CreateAuditLogDTO) => {
  const query = `
      INSERT INTO audit_logs (
        server_name,
        user_id,
        action,
        module,
        entity_id,
        old_value,
        new_value,
        ip_address
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8
      )
      RETURNING *;
    `;

  const values = [
    payload.server_name,
    payload.user_id,
    payload.action,
    payload.module,
    payload.entity_id,
    JSON.stringify(payload.old_value),
    JSON.stringify(payload.new_value),
    payload.ip_address,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllAuditLogs = async () => {
  const query = `
      SELECT *
      FROM audit_logs
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getAuditLogById = async (id: string) => {
  const query = `
      SELECT *
      FROM audit_logs
      WHERE id = $1;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getAuditLogsByUser = async (userId: string) => {
  const query = `
      SELECT *
      FROM audit_logs
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};

export const getAuditLogsByModule = async (module: string) => {
  const query = `
      SELECT *
      FROM audit_logs
      WHERE module = $1
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query, [module]);

  return result.rows;
};

export const getEntityAuditLogs = async (entityId: string) => {
  const query = `
      SELECT *
      FROM audit_logs
      WHERE entity_id = $1
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query, [entityId]);

  return result.rows;
};

export const getRecentAuditLogs = async (limit: number = 50) => {
  const query = `
      SELECT *
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT $1;
    `;

  const result = await pool.query(query, [limit]);

  return result.rows;
};

export const deleteAuditLog = async (id: string) => {
  const query = `
      DELETE FROM audit_logs
      WHERE id = $1
      RETURNING *;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};
