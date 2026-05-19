export const GET_ALL_STOCKS = `
SELECT * FROM stocks_master
ORDER BY created_at DESC
`;

export const CREATE_STOCK = `
INSERT INTO stocks_master
(
    symbol,
    company_name,
    sector,
    exchange,
    market_price
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;