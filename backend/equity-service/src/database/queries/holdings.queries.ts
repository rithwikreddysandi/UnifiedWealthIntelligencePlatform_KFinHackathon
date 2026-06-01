export const GET_HOLDINGS_BY_INVESTOR = `
SELECT
    eh.id,
    eh.quantity,
    eh.average_buy_price,
    eh.current_value,
    eh.profit_loss,

    sm.symbol,
    sm.company_name,
    sm.market_price

FROM equity_holdings eh

JOIN stocks_master sm
ON eh.stock_id = sm.id

WHERE eh.investor_id = $1
`;
