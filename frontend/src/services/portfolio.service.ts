const API =
  process.env.NEXT_PUBLIC_API_URL;

export const getPortfolio =
  async () => {

    const token =
      localStorage.getItem("token");

    const investorId =
      localStorage.getItem(
        "investorId"
      );

      console.log(`frontend logging ${investorId}`);
      

    const response = await fetch(
      `${API}/portfolio/${investorId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return response.json();
};