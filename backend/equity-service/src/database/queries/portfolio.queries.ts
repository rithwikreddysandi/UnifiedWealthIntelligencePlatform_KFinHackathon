export const CREATE_PORTFOLIO_SNAPSHOT = `
INSERT INTO equity_portfolio_snapshots
(
    investor_id,
    portfolio_value,
    daily_gain_loss,
    snapshot_date
)
VALUES
(
    $1,
    $2,
    $3,
    CURRENT_DATE
)
RETURNING *
`;

export const GET_PORTFOLIO_SNAPSHOTS = `
SELECT
    id,
    investor_id,
    portfolio_value,
    daily_gain_loss,
    snapshot_date,
    created_at

FROM equity_portfolio_snapshots

WHERE investor_id = $1

ORDER BY snapshot_date DESC
`;

export const GET_PORTFOLIO_SUMMARY = `
SELECT

    COALESCE(
        SUM(current_value),
        0
    ) AS portfolio_value,

    COALESCE(
        SUM(profit_loss),
        0
    ) AS daily_gain_loss

FROM equity_holdings

WHERE investor_id = $1
`;