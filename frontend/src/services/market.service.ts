const API =
  process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {
    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  };
};

const getInvestorId = () =>
  localStorage.getItem("investorId");

const postJson = async (
  path: string,
  data: any
) => {

  const response = await fetch(
    `${API}${path}`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

const requestJson = async (path: string) => {

  const response = await fetch(
    `${API}${path}`,
    {
      headers: getHeaders(),
    }
  );

  return response.json();
};

export const getEquityWorkspace =
  async () => {

    const investorId =
      getInvestorId();

    const [
      stocks,
      holdings,
      orders,
      transactions,
    ] = await Promise.all([
      requestJson("/equity/stocks"),
      investorId
        ? requestJson(`/equity/holdings/${investorId}`)
        : Promise.resolve({ data: [] }),
      investorId
        ? requestJson(`/equity/orders/${investorId}`)
        : Promise.resolve({ data: [] }),
      investorId
        ? requestJson(`/equity/transactions/${investorId}`)
        : Promise.resolve({ data: [] }),
    ]);

    return {
      stocks: stocks.data || [],
      holdings: holdings.data || [],
      orders: orders.data || [],
      transactions:
        transactions.data || [],
    };
};

export const getMutualFundWorkspace =
  async () => {

    const investorId =
      getInvestorId();

    const [
      funds,
      holdings,
      sips,
      transactions,
    ] = await Promise.all([
      requestJson("/mutual-funds/funds"),
      investorId
        ? requestJson(`/mutual-funds/holdings/investor/${investorId}`)
        : Promise.resolve({ data: [] }),
      investorId
        ? requestJson(`/mutual-funds/sips/investor/${investorId}`)
        : Promise.resolve({ data: [] }),
      investorId
        ? requestJson(`/mutual-funds/transactions/investor/${investorId}`)
        : Promise.resolve({ data: [] }),
    ]);

    return {
      funds: funds.data || [],
      holdings: holdings.data || [],
      sips: sips.data || [],
      transactions:
        transactions.data || [],
    };
};

export const createFundTransaction =
  async (data: {
    fund_id: string;
    transaction_type: "PURCHASE" | "REDEEM";
    amount: number;
  }) => {

    const investorId =
      getInvestorId();

    return postJson(
      "/mutual-funds/transactions",
      {
        investor_id: investorId,
        ...data,
      }
    );
};

export const createSip =
  async (data: {
    fund_id: string;
    sip_amount: number;
    frequency:
      | "DAILY"
      | "WEEKLY"
      | "MONTHLY"
      | "QUARTERLY";
    start_date: string;
  }) => {

    const investorId =
      getInvestorId();

    return postJson(
      "/mutual-funds/sips",
      {
        investor_id: investorId,
        ...data,
      }
    );
};

export const createMutualFund =
  async (data: {
    fund_code: string;
    fund_name: string;
    amc_name?: string;
    category?: string;
    risk_level?:
      | "LOW"
      | ""
      | "MEDIUM"
      | "HIGH"
      | "VERY_HIGH";
    current_nav?: number;
  }) =>
    postJson(
      "/mutual-funds/funds",
      {
        ...data,
        amc_name:
          data.amc_name || null,
        category:
          data.category || null,
        risk_level:
          data.risk_level || null,
        current_nav:
          data.current_nav ?? 0,
      }
    );
