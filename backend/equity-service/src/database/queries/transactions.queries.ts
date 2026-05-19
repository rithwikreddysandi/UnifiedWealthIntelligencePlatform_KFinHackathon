export const CREATE_BUY_TRANSACTION = `
INSERT INTO equity_transactions
(
    investor_id,
    stock_id,
    transaction_type,
    quantity,
    price,
    brokerage,
    tax,
    status
)
VALUES
(
    $1,
    $2,
    'BUY',
    $3,
    $4,
    0,
    0,
    'SUCCESS'
)
RETURNING *
`;


export const GET_EXISTING_HOLDING = `
SELECT *
FROM equity_holdings
WHERE investor_id = $1
AND stock_id = $2
`;


export const CREATE_HOLDING = `
INSERT INTO equity_holdings
(
    investor_id,
    stock_id,
    quantity,
    average_buy_price,
    current_value,
    profit_loss
)
VALUES
(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
RETURNING *
`;


export const UPDATE_HOLDING = `
UPDATE equity_holdings
SET
    quantity = $1,
    average_buy_price = $2,
    current_value = $3,
    profit_loss = $4,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $5
RETURNING *
`;


export const CREATE_SELL_TRANSACTION = `
INSERT INTO equity_transactions
(
    investor_id,
    stock_id,
    transaction_type,
    quantity,
    price,
    brokerage,
    tax,
    status
)
VALUES
(
    $1,
    $2,
    'SELL',
    $3,
    $4,
    0,
    0,
    'SUCCESS'
)
RETURNING *
`;

export const GET_TRANSACTIONS_BY_INVESTOR = `
SELECT
    et.id,
    et.transaction_type,
    et.quantity,
    et.price,
    et.total_amount,
    et.status,
    et.transaction_date,

    sm.symbol,
    sm.company_name

FROM equity_transactions et

JOIN stocks_master sm
ON et.stock_id = sm.id

WHERE et.investor_id = $1

ORDER BY et.transaction_date DESC
`;