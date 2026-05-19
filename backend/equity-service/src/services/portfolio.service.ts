import { pool } from "../database/pool";

import {
  CREATE_PORTFOLIO_SNAPSHOT,
  GET_PORTFOLIO_SNAPSHOTS,
  GET_PORTFOLIO_SUMMARY,
} from "../database/queries/portfolio.queries";

export const createPortfolioSnapshotService =
async (
  investorId: string
) => {

  const summaryResult =
    await pool.query(
      GET_PORTFOLIO_SUMMARY,
      [investorId]
    );

  const summary =
    summaryResult.rows[0];

  const snapshotResult =
    await pool.query(
      CREATE_PORTFOLIO_SNAPSHOT,
      [
        investorId,
        summary.portfolio_value,
        summary.daily_gain_loss,
      ]
    );

  return snapshotResult.rows[0];
};

export const getPortfolioSnapshotsService =
async (
  investorId: string
) => {

  const result =
    await pool.query(
      GET_PORTFOLIO_SNAPSHOTS,
      [investorId]
    );

  return result.rows;
};