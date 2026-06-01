export const getEquityHoldings = async (
  investorId: string,
  authHeader?: string,
) => {
  try {
    const response = await fetch(
      `${process.env.EQUITY_SERVICE_URL}/api/holdings/${investorId}`,
      {
        headers: {
          Authorization: authHeader || " ",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch equity holdings");
    }

    return response.json();
  } catch (error) {
    console.log("Equity Holdings Error:", error);

    return {
      success: false,
      data: [],
    };
  }
};

export const getEquityTransactions = async (
  investorId: string,
  authHeader?: string,
) => {
  try {
    const response = await fetch(
      `${process.env.EQUITY_SERVICE_URL}/api/transactions/${investorId}`,
      {
        headers: {
          Authorization: authHeader || "",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch equity transactions");
    }

    return response.json();
  } catch (error) {
    console.log("Equity Transactions Error:", error);

    return {
      success: false,
      data: [],
    };
  }
};
