const API =
  process.env
    .NEXT_PUBLIC_API_URL;

export const getDashboardData =
  async () => {

    const investorId =
      localStorage.getItem(
        "investorId"
      );

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await fetch(
        `${API}/portfolio/${investorId}`,
        {
          method: "GET",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    if (!response.ok) {

      throw new Error(
        "Failed to fetch dashboard"
      );
    }

    return response.json();
};