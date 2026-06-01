export const CREATE_DIVIDEND = `
INSERT INTO dividends
(
    investor_id,
    stock_id,
    dividend_amount,
    dividend_date
)
VALUES
(
    $1,
    $2,
    $3,
    $4
)
RETURNING *
`;

export const GET_DIVIDENDS_BY_INVESTOR = `
SELECT
    d.id,
    d.dividend_amount,
    d.dividend_date,
    d.created_at,

    sm.symbol,
    sm.company_name

FROM dividends d

JOIN stocks_master sm
ON d.stock_id = sm.id

WHERE d.investor_id = $1

ORDER BY d.dividend_date DESC
`;
