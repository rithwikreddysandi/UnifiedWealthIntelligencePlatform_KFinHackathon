import { pool } from "../config/db.js";

import {
  CreateInvestorHoldingDTO,
  UpdateInvestorHoldingDTO,
} from "../models/investorHolding.model.js";

export const createHolding = async (payload: CreateInvestorHoldingDTO) => {
  const query = `
    INSERT INTO investor_fund_holdings (
      investor_id,
      fund_id,
      units,
      average_nav,
      invested_amount,
      current_value,
      profit_loss
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    payload.investor_id,
    payload.fund_id,
    payload.units,
    payload.average_nav,
    payload.invested_amount,
    payload.current_value,
    payload.profit_loss,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getHoldingById = async (id: string) => {
  const query = `
      SELECT *
      FROM investor_fund_holdings
      WHERE id = $1;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getInvestorHoldings = async (investorId: string) => {
  const query = `
      SELECT
        h.*,
        mf.fund_name,
        mf.amc_name,
        mf.category,
        mf.current_nav
      FROM investor_fund_holdings h
      INNER JOIN mutual_funds_master mf
      ON h.fund_id = mf.id
      WHERE h.investor_id = $1
      ORDER BY h.updated_at DESC;
    `;

  const result = await pool.query(query, [investorId]);

  return result.rows;
};

export const getHoldingByInvestorAndFund = async (
  investorId: string,
  fundId: string,
) => {
  const query = `
      SELECT *
      FROM investor_fund_holdings
      WHERE investor_id = $1
      AND fund_id = $2;
    `;

  const result = await pool.query(query, [investorId, fundId]);

  return result.rows[0];
};

export const updateHolding = async (
  id: string,
  payload: UpdateInvestorHoldingDTO,
) => {
  const query = `
      UPDATE investor_fund_holdings
      SET
        units = COALESCE($1, units),
        average_nav = COALESCE($2, average_nav),
        invested_amount = COALESCE($3, invested_amount),
        current_value = COALESCE($4, current_value),
        profit_loss = COALESCE($5, profit_loss),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;

  const values = [
    payload.units,
    payload.average_nav,
    payload.invested_amount,
    payload.current_value,
    payload.profit_loss,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteHolding = async (id: string) => {
  const query = `
      DELETE FROM investor_fund_holdings
      WHERE id = $1
      RETURNING *;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getInvestorPortfolioSummary = async (investorId: string) => {
  const query = `
      SELECT
        investor_id,
        COALESCE(SUM(invested_amount), 0)
          AS total_invested_amount,

        COALESCE(SUM(current_value), 0)
          AS total_current_value,

        COALESCE(SUM(profit_loss), 0)
          AS total_profit_loss

      FROM investor_fund_holdings
      WHERE investor_id = $1
      GROUP BY investor_id;
    `;

  const result = await pool.query(query, [investorId]);

  return result.rows[0];
};
