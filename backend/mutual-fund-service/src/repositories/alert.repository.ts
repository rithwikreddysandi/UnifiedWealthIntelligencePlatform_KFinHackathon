import { pool } from "../config/db.js";

import {
  CreateAlertDTO,
  UpdateAlertDTO,
} from "../models/alert.model.js";



export const createAlert = async (
  payload: CreateAlertDTO
) => {

  const query = `
    INSERT INTO alerts (
      investor_id,
      alert_type,
      severity,
      message
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    payload.investor_id || null,
    payload.alert_type,
    payload.severity || "MEDIUM",
    payload.message,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};





export const getAllAlerts =
  async () => {

    const query = `
      SELECT *
      FROM alerts
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  };





export const getAlertById =
  async (id: string) => {

    const query = `
      SELECT *
      FROM alerts
      WHERE id = $1;
    `;

    const result = await pool.query(
      query,
      [id]
    );

    return result.rows[0];
  };





export const getInvestorAlerts =
  async (investorId: string) => {

    const query = `
      SELECT *
      FROM alerts
      WHERE investor_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(
      query,
      [investorId]
    );

    return result.rows;
  };





export const updateAlert =
  async (
    id: string,
    payload: UpdateAlertDTO
  ) => {

    const query = `
      UPDATE alerts
      SET
        severity = COALESCE($1, severity),
        message = COALESCE($2, message),
        status = COALESCE($3, status)
      WHERE id = $4
      RETURNING *;
    `;

    const values = [
      payload.severity,
      payload.message,
      payload.status,
      id,
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];
  };





export const deleteAlert =
  async (id: string) => {

    const query = `
      DELETE FROM alerts
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(
      query,
      [id]
    );

    return result.rows[0];
  };





export const getOpenAlerts =
  async () => {

    const query = `
      SELECT *
      FROM alerts
      WHERE status = 'OPEN'
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  };





export const getCriticalAlerts =
  async () => {

    const query = `
      SELECT *
      FROM alerts
      WHERE severity = 'CRITICAL'
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  };





export const resolveAlert =
  async (id: string) => {

    const query = `
      UPDATE alerts
      SET status = 'RESOLVED'
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(
      query,
      [id]
    );

    return result.rows[0];
  };





export const dismissAlert =
  async (id: string) => {

    const query = `
      UPDATE alerts
      SET status = 'DISMISSED'
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(
      query,
      [id]
    );

    return result.rows[0];
  };