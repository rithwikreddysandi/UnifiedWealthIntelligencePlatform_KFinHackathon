import { pool } from "../config/db.js";

import {
  CreateSipAccountDTO,
  UpdateSipAccountDTO,
  CreateSipTransactionDTO,
  UpdateSipTransactionDTO,
} from "../models/sipAccount.model.js";

export const createSip = async (payload: CreateSipAccountDTO) => {
  const query = `
    INSERT INTO sip_accounts (
      investor_id,
      fund_id,
      sip_amount,
      frequency,
      start_date,
      next_installment_date
    )
    VALUES ($1, $2, $3, $4, $5, $5)
    RETURNING *;
  `;

  const values = [
    payload.investor_id,
    payload.fund_id,
    payload.sip_amount,
    payload.frequency,
    payload.start_date,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllSips = async () => {
  const query = `
    SELECT *
    FROM sip_accounts
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const getSipById = async (id: string) => {
  const query = `
    SELECT *
    FROM sip_accounts
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getInvestorSips = async (investorId: string) => {
  const query = `
    SELECT *
    FROM sip_accounts
    WHERE investor_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [investorId]);

  return result.rows;
};

export const updateSip = async (id: string, payload: UpdateSipAccountDTO) => {
  const query = `
    UPDATE sip_accounts
    SET
      sip_amount = COALESCE($1, sip_amount),
      frequency = COALESCE($2, frequency),
      next_installment_date = COALESCE($3, next_installment_date),
      status = COALESCE($4, status),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *;
  `;

  const values = [
    payload.sip_amount,
    payload.frequency,
    payload.next_installment_date,
    payload.status,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteSip = async (id: string) => {
  const query = `
    DELETE FROM sip_accounts
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const createSipTransaction = async (
  payload: CreateSipTransactionDTO,
) => {
  const query = `
    INSERT INTO sip_transactions (
      sip_id,
      amount,
      nav,
      units_allocated,
      debit_date,
      transaction_status,
      failure_reason
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    payload.sip_id,
    payload.amount,
    payload.nav,
    payload.units_allocated,
    payload.debit_date,
    payload.transaction_status || "PENDING",
    payload.failure_reason,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getSipTransactions = async (sipId: string) => {
  const query = `
    SELECT *
    FROM sip_transactions
    WHERE sip_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [sipId]);

  return result.rows;
};

export const updateSipTransaction = async (
  id: string,
  payload: UpdateSipTransactionDTO,
) => {
  const query = `
    UPDATE sip_transactions
    SET
      nav = COALESCE($1, nav),
      units_allocated = COALESCE($2, units_allocated),
      debit_date = COALESCE($3, debit_date),
      transaction_status = COALESCE($4, transaction_status),
      failure_reason = COALESCE($5, failure_reason)
    WHERE id = $6
    RETURNING *;
  `;

  const values = [
    payload.nav,
    payload.units_allocated,
    payload.debit_date,
    payload.transaction_status,
    payload.failure_reason,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getFailedSipTransactions = async () => {
  const query = `
      SELECT *
      FROM sip_transactions
      WHERE transaction_status = 'FAILED'
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};
