import { pool } from "../database/pool";

import {
  CREATE_BUY_TRANSACTION,
  CREATE_SELL_TRANSACTION,
  GET_EXISTING_HOLDING,
  CREATE_HOLDING,
  UPDATE_HOLDING,
  GET_TRANSACTIONS_BY_INVESTOR,
} from "../database/queries/transactions.queries";

export const buyStockService = async (transactionData: any) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { investor_id, stock_id, quantity, price } = transactionData;

    // STEP 1 → Insert transaction

    const transactionResult = await client.query(CREATE_BUY_TRANSACTION, [
      investor_id,
      stock_id,
      quantity,
      price,
    ]);

    // STEP 2 → Check holding exists

    const existingHoldingResult = await client.query(GET_EXISTING_HOLDING, [
      investor_id,
      stock_id,
    ]);

    // IF HOLDING EXISTS

    if (existingHoldingResult.rows.length > 0) {
      const existingHolding = existingHoldingResult.rows[0];

      const oldQuantity = Number(existingHolding.quantity);

      const oldAveragePrice = Number(existingHolding.average_buy_price);

      const newQuantity = oldQuantity + Number(quantity);

      // weighted average calculation

      const newAveragePrice =
        (oldQuantity * oldAveragePrice + Number(quantity) * Number(price)) /
        newQuantity;

      const currentValue = newQuantity * Number(price);

      const profitLoss = currentValue - newQuantity * newAveragePrice;

      // UPDATE HOLDING

      await client.query(UPDATE_HOLDING, [
        newQuantity,
        newAveragePrice,
        currentValue,
        profitLoss,
        existingHolding.id,
      ]);
    }

    // IF HOLDING DOES NOT EXIST
    else {
      const currentValue = Number(quantity) * Number(price);

      await client.query(CREATE_HOLDING, [
        investor_id,
        stock_id,
        quantity,
        price,
        currentValue,
        0,
      ]);
    }

    await client.query("COMMIT");

    return transactionResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const sellStockService = async (transactionData: any) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { investor_id, stock_id, quantity, price } = transactionData;

    // STEP 1 → Check existing holding

    const existingHoldingResult = await client.query(GET_EXISTING_HOLDING, [
      investor_id,
      stock_id,
    ]);

    // HOLDING NOT FOUND

    if (existingHoldingResult.rows.length === 0) {
      throw new Error("Holding does not exist");
    }

    const existingHolding = existingHoldingResult.rows[0];

    const oldQuantity = Number(existingHolding.quantity);

    const sellQuantity = Number(quantity);

    // INSUFFICIENT QUANTITY

    if (sellQuantity > oldQuantity) {
      throw new Error("Insufficient stock quantity");
    }

    // STEP 2 → Insert SELL transaction

    const transactionResult = await client.query(CREATE_SELL_TRANSACTION, [
      investor_id,
      stock_id,
      quantity,
      price,
    ]);

    // STEP 3 → Calculate updated holding

    const remainingQuantity = oldQuantity - sellQuantity;

    const averageBuyPrice = Number(existingHolding.average_buy_price);

    const currentValue = remainingQuantity * Number(price);

    const profitLoss = currentValue - remainingQuantity * averageBuyPrice;

    // STEP 4 → Update holdings

    await client.query(UPDATE_HOLDING, [
      remainingQuantity,
      averageBuyPrice,
      currentValue,
      profitLoss,
      existingHolding.id,
    ]);

    await client.query("COMMIT");

    return transactionResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

//Investor Transactions

export const getTransactionsByInvestorService = async (investorId: string) => {
  const result = await pool.query(GET_TRANSACTIONS_BY_INVESTOR, [investorId]);

  return result.rows;
};
