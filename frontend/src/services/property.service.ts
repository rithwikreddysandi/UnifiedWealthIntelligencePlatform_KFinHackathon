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

export const getProperties =
  async () => {

    const investorId =
      localStorage.getItem(
        "investorId"
      );

    const response = await fetch(
      `${API}/properties/investor/${investorId}`,
      {
        headers: getHeaders(),
      }
    );

    return response.json();
};

export const createProperty =
  async (data: any) => {

    const response = await fetch(
      `${API}/properties`,
      {
        method: "POST",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return response.json();
};

export const deleteProperty =
  async (id: string) => {

    const response = await fetch(
      `${API}/properties/${id}`,
      {
        method: "DELETE",

        headers: getHeaders(),
      }
    );

    return response.json();
};
