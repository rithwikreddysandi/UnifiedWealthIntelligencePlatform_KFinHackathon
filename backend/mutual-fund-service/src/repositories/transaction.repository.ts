import { pool } from "../config/db.js";

import {
  CreateFundTransactionDTO,
  UpdateFundTransactionDTO,
} from "../models/fundTransaction.model.js";

export const createTransaction = async (payload: CreateFundTransactionDTO) => {
  const query = `
    INSERT INTO fund_transactions (
      investor_id,
      fund_id,
      transaction_type,
      amount,
      units,
      nav,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, 'PENDING')
    RETURNING *;
  `;

  const values = [
    payload.investor_id,
    payload.fund_id,
    payload.transaction_type,
    payload.amount,
    payload.units,
    payload.nav,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAllTransactions = async () => {
  const query = `
      SELECT *
      FROM fund_transactions
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getTransactionById = async (id: string) => {
  const query = `
      SELECT *
      FROM fund_transactions
      WHERE id = $1;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getInvestorTransactions = async (investorId: string) => {
  const query = `
      SELECT *
      FROM fund_transactions
      WHERE investor_id = $1
      ORDER BY transaction_date DESC;
    `;

  const result = await pool.query(query, [investorId]);

  return result.rows;
};

export const getFundTransactions = async (fundId: string) => {
  const query = `
      SELECT *
      FROM fund_transactions
      WHERE fund_id = $1
      ORDER BY transaction_date DESC;
    `;

  const result = await pool.query(query, [fundId]);

  return result.rows;
};

export const updateTransaction = async (
  id: string,
  payload: UpdateFundTransactionDTO,
) => {
  const query = `
      UPDATE fund_transactions
      SET
        status = COALESCE($1, status),
        units = COALESCE($2, units),
        nav = COALESCE($3, nav)
      WHERE id = $4
      RETURNING *;
    `;

  const values = [payload.status, payload.units, payload.nav, id];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteTransaction = async (id: string) => {
  const query = `
      DELETE FROM fund_transactions
      WHERE id = $1
      RETURNING *;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getPendingTransactions = async () => {
  const query = `
      SELECT *
      FROM fund_transactions
      WHERE status = 'PENDING'
      ORDER BY created_at ASC;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getFailedTransactions = async () => {
  const query = `
      SELECT *
      FROM fund_transactions
      WHERE status = 'FAILED'
      ORDER BY created_at DESC;
    `;

  const result = await pool.query(query);

  return result.rows;
};
