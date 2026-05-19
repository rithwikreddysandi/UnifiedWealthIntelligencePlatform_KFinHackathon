import { pool } from "../database/pool";

import {
  GET_HOLDINGS_BY_INVESTOR,
} from "../database/queries/holdings.queries";

export const getHoldingsByInvestorService =
async (
  investorId: string
) => {

  const result = await pool.query(
    GET_HOLDINGS_BY_INVESTOR,
    [investorId]
  );

  return result.rows;
};