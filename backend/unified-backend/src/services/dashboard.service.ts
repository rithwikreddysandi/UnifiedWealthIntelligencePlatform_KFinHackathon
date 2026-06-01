import { aggregatePortfolio } from "./aggregation.service.js";

export const getDashboardService = async (
  investorId: string,
  authHeader?: string,
) => {
  return aggregatePortfolio(investorId, authHeader);
};
