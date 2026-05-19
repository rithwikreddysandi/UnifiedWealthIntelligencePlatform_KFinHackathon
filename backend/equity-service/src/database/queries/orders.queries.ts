export const CREATE_MARKET_ORDER = `
INSERT INTO market_orders
(
    investor_id,
    stock_id,
    order_type,
    quantity,
    limit_price,
    executed_price,
    status
)
VALUES
(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    'SUCCESS'
)
RETURNING *
`;

//Get Orders

export const GET_ORDERS_BY_INVESTOR = `
SELECT
    mo.id,
    mo.order_type,
    mo.quantity,
    mo.limit_price,
    mo.executed_price,
    mo.status,
    mo.placed_at,

    sm.symbol,
    sm.company_name

FROM market_orders mo

JOIN stocks_master sm
ON mo.stock_id = sm.id

WHERE mo.investor_id = $1

ORDER BY mo.placed_at DESC
`;


