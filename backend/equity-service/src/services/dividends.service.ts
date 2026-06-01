import { pool } from "../database/pool";

import {
  CREATE_DIVIDEND,
  GET_DIVIDENDS_BY_INVESTOR,
} from "../database/queries/dividends.queries";

export const createDividendService = async (dividendData: any) => {
  const { investor_id, stock_id, dividend_amount, dividend_date } =
    dividendData;

  const result = await pool.query(CREATE_DIVIDEND, [
    investor_id,
    stock_id,
    dividend_amount,
    dividend_date,
  ]);

  return result.rows[0];
};

export const getDividendsByInvestorService = async (investorId: string) => {
  const result = await pool.query(GET_DIVIDENDS_BY_INVESTOR, [investorId]);

  return result.rows;
};
