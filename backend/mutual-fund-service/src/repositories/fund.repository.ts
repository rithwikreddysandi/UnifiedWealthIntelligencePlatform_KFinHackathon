import { pool } from "../config/db.js";

import {
  CreateMutualFundDTO,
  UpdateMutualFundDTO,
} from "../models/mutualFund.model.js";



export const createFund = async (
  payload: CreateMutualFundDTO
) => {

  const query = `
    INSERT INTO mutual_funds_master (
      fund_code,
      fund_name,
      amc_name,
      category,
      risk_level,
      current_nav
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    payload.fund_code,
    payload.fund_name,
    payload.amc_name,
    payload.category,
    payload.risk_level,
    payload.current_nav,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};





export const getAllFunds = async () => {

  const query = `
    SELECT *
    FROM mutual_funds_master
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};





export const getFundById = async (
  id: string
) => {

  const query = `
    SELECT *
    FROM mutual_funds_master
    WHERE id = $1;
  `;

  const result = await pool.query(
    query,
    [id]
  );

  return result.rows[0];
};





export const getFundByCode = async (
  fundCode: string
) => {

  const query = `
    SELECT *
    FROM mutual_funds_master
    WHERE fund_code = $1;
  `;

  const result = await pool.query(
    query,
    [fundCode]
  );

  return result.rows[0];
};





export const updateFund = async (
  id: string,
  payload: UpdateMutualFundDTO
) => {

  const query = `
    UPDATE mutual_funds_master
    SET
      fund_name = COALESCE($1, fund_name),
      amc_name = COALESCE($2, amc_name),
      category = COALESCE($3, category),
      risk_level = COALESCE($4, risk_level),
      current_nav = COALESCE($5, current_nav),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *;
  `;

  const values = [
    payload.fund_name,
    payload.amc_name,
    payload.category,
    payload.risk_level,
    payload.current_nav,
    id,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};





export const deleteFund = async (
  id: string
) => {

  const query = `
    DELETE FROM mutual_funds_master
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [id]
  );

  return result.rows[0];
};