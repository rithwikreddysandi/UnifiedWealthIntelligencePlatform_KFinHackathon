import {
  MfTransactionType,
  SipFrequency,
  SipStatus,
} from "../utils/enums.js";



export interface MutualFund {

  id: string;

  fund_code: string;

  fund_name: string;

  amc_name: string;

  category: string;

  risk_level: string;

  current_nav: number;

  created_at?: Date;

  updated_at?: Date;
}



export interface CreateMutualFundDTO {

  fund_code: string;

  fund_name: string;

  amc_name: string;

  category: string;

  risk_level: string;

  current_nav: number;
}



export interface UpdateMutualFundDTO {

  fund_name?: string;

  amc_name?: string;

  category?: string;

  risk_level?: string;

  current_nav?: number;
}



export interface NavHistory {

  id: string;

  fund_id: string;

  nav: number;

  nav_date: Date;

  created_at?: Date;
}



export interface InvestorFundHolding {

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



export interface FundTransaction {

  id: string;

  investor_id: string;

  fund_id: string;

  transaction_type: MfTransactionType;

  amount: number;

  units: number;

  nav: number;

  status: string;

  transaction_date?: Date;

  created_at?: Date;
}



export interface SipAccount {

  id: string;

  investor_id: string;

  fund_id: string;

  sip_amount: number;

  frequency: SipFrequency;

  start_date: Date;

  next_installment_date: Date;

  status: SipStatus;

  created_at?: Date;

  updated_at?: Date;
}