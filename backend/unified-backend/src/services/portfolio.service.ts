import { aggregatePortfolio } from "./aggregation.service.js";

export const getPortfolioService = async (
  investorId: string,
  authHeader?: string,
) => {
  return aggregatePortfolio(investorId, authHeader);
};
