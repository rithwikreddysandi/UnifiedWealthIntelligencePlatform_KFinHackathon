export const checkServiceHealth = async () => {
  const services = [
    {
      name: "Equity Service",

      url: `${process.env.EQUITY_SERVICE_URL || "http://localhost:5001"}/api/stocks`,
    },

    {
      name: "MF Service",

      url: `${process.env.MF_SERVICE_URL || "http://localhost:5002"}/api/v1/health`,
    },
  ];

  const results = [];

  for (const service of services) {
    try {
      const response = await fetch(service.url);

      results.push({
        service: service.name,

        status: response.ok ? "UP" : "DOWN",
      });
    } catch (error) {
      results.push({
        service: service.name,

        status: "DOWN",
      });
    }
  }

  return results;
};
