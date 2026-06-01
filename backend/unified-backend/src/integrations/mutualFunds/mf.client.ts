export const getMutualFunds = async (
  investorId: string,
  authHeader?: string,
) => {
  try {
    const response = await fetch(
      `${process.env.MF_SERVICE_URL}/api/v1/funds/investor/${investorId}`,
      {
        headers: {
          Authorization: authHeader || "",
        },
      },
    );

    console.log("MF STATUS:", response.status);
    console.log(
      "MF URL:",
      `${process.env.MF_SERVICE_URL}/api/v1/funds/${investorId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch mutual funds");
    }

    return response.json();
  } catch (error) {
    console.log("MF Service Error:", error);

    return {
      success: false,
      data: [],
    };
  }
};

export const getSIPs = async (investorId: string, authHeaders?: string) => {
  try {
    const response = await fetch(
      `${process.env.MF_SERVICE_URL}/api/v1/sips/${investorId}`,
      {
        headers: {
          Authorization: authHeaders || "",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch SIPs");
    }

    return response.json();
  } catch (error) {
    console.log("SIP Service Error:", error);

    return {
      success: false,
      data: [],
    };
  }
};
