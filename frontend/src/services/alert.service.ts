const API =
  process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {
    Authorization:
      `Bearer ${token}`,
  };
};

export const getAlerts =
  async () => {

    const response = await fetch(
      `${API}/alerts`,
      {
        headers: getHeaders(),
      }
    );

    return response.json();
};

export const getServiceHealth =
  async () => {

    const response = await fetch(
      `${API}/service-health`,
      {
        headers: getHeaders(),
      }
    );

    return response.json();
};