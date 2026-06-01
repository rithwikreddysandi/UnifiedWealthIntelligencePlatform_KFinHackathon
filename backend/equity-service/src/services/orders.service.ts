import { pool } from "../database/pool";

import {
  CREATE_MARKET_ORDER,
  GET_ORDERS_BY_INVESTOR,
} from "../database/queries/orders.queries";

export const createOrderService = async (orderData: any) => {
  const { investor_id, stock_id, order_type, quantity, limit_price } =
    orderData;

  const executedPrice = limit_price || 0;

  const result = await pool.query(CREATE_MARKET_ORDER, [
    investor_id,
    stock_id,
    order_type,
    quantity,
    limit_price,
    executedPrice,
  ]);

  return result.rows[0];
};

export const getOrdersByInvestorService = async (investorId: string) => {
  const result = await pool.query(GET_ORDERS_BY_INVESTOR, [investorId]);

  return result.rows;
};
