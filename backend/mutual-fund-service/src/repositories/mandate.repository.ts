import { pool } from "../config/db.js";

import { CreateMandateDTO, UpdateMandateDTO } from "../models/mandate.model.js";

export const createMandate = async (payload: CreateMandateDTO) => {
  const query = `
    INSERT INTO mandates (
      investor_id,
      bank_account_id,
      mandate_reference,
      maximum_amount,
      expiry_date
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    payload.investor_id,
    payload.bank_account_id,
    payload.mandate_reference,
    payload.maximum_amount,
    payload.expiry_date,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllMandates = async () => {
  const query = `
      SELECT *
      FROM mandates
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getMandateById = async (id: string) => {
  const query = `
      SELECT *
      FROM mandates
      WHERE id = $1;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getInvestorMandates = async (investorId: string) => {
  const query = `
      SELECT *
      FROM mandates
      WHERE investor_id = $1
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query, [investorId]);

  return result.rows;
};

export const getMandateByReference = async (mandateReference: string) => {
  const query = `
      SELECT *
      FROM mandates
      WHERE mandate_reference = $1;
    `;

  const result = await pool.query(query, [mandateReference]);

  return result.rows[0];
};

export const updateMandate = async (id: string, payload: UpdateMandateDTO) => {
  const query = `
      UPDATE mandates
      SET
        maximum_amount = COALESCE($1, maximum_amount),
        status = COALESCE($2, status),
        expiry_date = COALESCE($3, expiry_date)
      WHERE id = $4
      RETURNING *;
    `;

  const values = [
    payload.maximum_amount,
    payload.status,
    payload.expiry_date,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteMandate = async (id: string) => {
  const query = `
      DELETE FROM mandates
      WHERE id = $1
      RETURNING *;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getApprovedMandates = async () => {
  const query = `
      SELECT *
      FROM mandates
      WHERE status = 'APPROVED'
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getExpiredMandates = async () => {
  const query = `
      SELECT *
      FROM mandates
      WHERE expiry_date < CURRENT_DATE
      ORDER BY expiry_date ASC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const validateMandate = async (investorId: string, amount: number) => {
  const query = `
      SELECT *
      FROM mandates
      WHERE investor_id = $1
      AND status = 'APPROVED'
      AND expiry_date >= CURRENT_DATE
      AND maximum_amount >= $2
      LIMIT 1;
    `;

  const result = await pool.query(query, [investorId, amount]);

  return result.rows[0];
};
