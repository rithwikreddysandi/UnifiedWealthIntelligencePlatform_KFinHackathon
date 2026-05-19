export interface InvestorHolding {

  id: string;

  investor_id: string;

  fund_id: string;

  units: number;

  average_nav: number;

  invested_amount: number;

  current_value: number;

  profit_loss: number;

  created_at?: Date;

  updated_at?: Date;
}



export interface CreateInvestorHoldingDTO {

  investor_id: string;

  fund_id: string;

  units: number;

  average_nav: number;

  invested_amount: number;

  current_value: number;

  profit_loss: number;
}



export interface UpdateInvestorHoldingDTO {

  units?: number;

  average_nav?: number;

  invested_amount?: number;

  current_value?: number;

  profit_loss?: number;
}



export interface InvestorPortfolioSummary {

  investor_id: string;

  total_invested_amount: number;

  total_current_value: number;

  total_profit_loss: number;

  total_return_percentage: number;
}



export interface FundHoldingDetails {

  fund_id: string;

  fund_name: string;

  amc_name: string;

  category: string;

  units: number;

  average_nav: number;

  current_nav: number;

  invested_amount: number;

  current_value: number;

  profit_loss: number;

  return_percentage: number;
}