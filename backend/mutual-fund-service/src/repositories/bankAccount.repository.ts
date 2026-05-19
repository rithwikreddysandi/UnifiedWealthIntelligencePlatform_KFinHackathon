import { pool } from "../config/db.js";

import {
  CreateBankAccountDTO,
  UpdateBankAccountDTO,
} from "../models/bankAccount.model.js";



export const createBankAccount =
  async (
    payload: CreateBankAccountDTO
  ) => {

    const query = `
      INSERT INTO bank_accounts (
        investor_id,
        bank_name,
        account_number_masked,
        ifsc_code
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      payload.investor_id,
      payload.bank_name,
      payload.account_number_masked,
      payload.ifsc_code,
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];
  };





export const getAllBankAccounts =
  async () => {

    const query = `
      SELECT *
      FROM bank_accounts
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  };





export const getBankAccountById =
  async (id: string) => {

    const query = `
      SELECT *
      FROM bank_accounts
      WHERE id = $1;
    `;

    const result = await pool.query(
      query,
      [id]
    );

    return result.rows[0];
  };





export const getInvestorBankAccounts =
  async (investorId: string) => {

    const query = `
      SELECT *
      FROM bank_accounts
      WHERE investor_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(
      query,
      [investorId]
    );

    return result.rows;
  };





export const updateBankAccount =
  async (
    id: string,
    payload: UpdateBankAccountDTO
  ) => {

    const query = `
      UPDATE bank_accounts
      SET
        bank_name = COALESCE($1, bank_name),
        account_number_masked =
          COALESCE($2, account_number_masked),
        ifsc_code = COALESCE($3, ifsc_code),
        mandate_status =
          COALESCE($4, mandate_status)
      WHERE id = $5
      RETURNING *;
    `;

    const values = [
      payload.bank_name,
      payload.account_number_masked,
      payload.ifsc_code,
      payload.mandate_status,
      id,
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];
  };





export const deleteBankAccount =
  async (id: string) => {

    const query = `
      DELETE FROM bank_accounts
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(
      query,
      [id]
    );

    return result.rows[0];
  };





export const getApprovedBankAccounts =
  async () => {

    const query = `
      SELECT *
      FROM bank_accounts
      WHERE mandate_status = 'APPROVED'
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  };





export const getPendingBankAccounts =
  async () => {

    const query = `
      SELECT *
      FROM bank_accounts
      WHERE mandate_status = 'PENDING'
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  };