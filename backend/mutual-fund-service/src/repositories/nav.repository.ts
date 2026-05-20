import { log } from "node:console";
import { pool } from "../config/db.js";

import {
  CreateNavHistoryDTO,
  UpdateNavHistoryDTO,
} from "../models/navHistory.model.js";

export const createNavHistory = async (payload: CreateNavHistoryDTO) => {
  const query = `
      INSERT INTO nav_history (
        fund_id,
        nav,
        nav_date
      )
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

  const values = [payload.fund_id, payload.nav, payload.nav_date];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getNavHistoryById = async (id: string) => {
  const query = `
      SELECT *
      FROM nav_history
      WHERE id = $1;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getFundNavHistory = async (fundId: string) => {
  const query = `
      SELECT *
      FROM nav_history
      WHERE fund_id = $1
      ORDER BY nav_date DESC;
    `;

  const result = await pool.query(query, [fundId]);

  return result.rows;
};

export const getLatestNav = async (fundId: string) => {
  const query = `
      SELECT *
      FROM nav_history
      WHERE fund_id = $1
      ORDER BY nav_date DESC
      LIMIT 1;
    `;

  const result = await pool.query(query, [fundId]);

  return result.rows[0];
};

export const updateNavHistory = async (
  id: string,
  payload: UpdateNavHistoryDTO,
) => {
  const query = `
      UPDATE nav_history
      SET
        nav = COALESCE($1, nav),
        nav_date = COALESCE($2, nav_date)
      WHERE id = $3
      RETURNING *;
    `;

  const values = [payload.nav, payload.nav_date, id];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteNavHistory = async (id: string) => {
  const query = `
      DELETE FROM nav_history
      WHERE id = $1
      RETURNING *;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const getNavByDate = async (fundId: string, navDate: Date) => {
  const query = `
      SELECT *
      FROM nav_history
      WHERE fund_id = $1
      AND nav_date = $2;
    `;

  const result = await pool.query(query, [fundId, navDate]);

  return result.rows[0];
};

export const getLatestNavs = async () => {
  const query = `
      SELECT DISTINCT ON (nh.fund_id)
        nh.*,
        mf.fund_name,
        mf.amc_name
      FROM nav_history nh
      INNER JOIN mutual_funds_master mf
      ON nh.fund_id = mf.id
      ORDER BY nh.fund_id, nh.nav_date DESC;
    `;

  const result = await pool.query(query);

  console.log(result);
  

  return result.rows;
};
