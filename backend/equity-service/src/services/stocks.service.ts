import { pool } from "../database/pool";
import { GET_ALL_STOCKS } from "../database/queries/stocks.queries";

export const getAllStocksService = async () => {
  const result = await pool.query(GET_ALL_STOCKS);

  return result.rows;
};

import { CREATE_STOCK } from "../database/queries/stocks.queries";

export const createStockService = async (stockData: any) => {
  const { symbol, company_name, sector, exchange, market_price } = stockData;

  const result = await pool.query(CREATE_STOCK, [
    symbol,
    company_name,
    sector,
    exchange,
    market_price,
  ]);

  return result.rows[0];
};
