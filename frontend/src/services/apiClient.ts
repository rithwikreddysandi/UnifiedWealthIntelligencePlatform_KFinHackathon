const API =
  process.env.NEXT_PUBLIC_API_URL;

export const getStoredToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

export const getStoredInvestorId = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("investorId")
    : null;

export const apiHeaders = () => {

  const token =
    getStoredToken();
  
  return {
    "Content-Type":
      "application/json",

    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
  };
};

export const apiGet =
  async (path: string) => {

    const response =
      await fetch(`${API}${path}`, {
        headers: apiHeaders(),
      });

    const json =
      await response.json().catch(() => ({
        success: false,
        message:
          "Invalid JSON response",
      }));

    return {
      ok: response.ok,
      status: response.status,
      path,
      ...json,
    };
};

export const apiPost =
  async (path: string, data: any) => {

    const response =
      await fetch(`${API}${path}`, {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify(data),
      });

    const json =
      await response.json().catch(() => ({
        success: false,
        message:
          "Invalid JSON response",
      }));

    return {
      ok: response.ok,
      status: response.status,
      path,
      ...json,
    };
};
