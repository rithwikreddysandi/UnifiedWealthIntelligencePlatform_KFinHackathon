import { MfTransactionType, OrderStatus } from "../utils/enums.js";

export interface FundTransaction {
  id: string;

  investor_id: string;

  fund_id: string;

  transaction_type: MfTransactionType;

  amount: number;

  units?: number;

  nav?: number;

  status: OrderStatus;

  transaction_date?: Date;

  created_at?: Date;
}

export interface CreateFundTransactionDTO {
  investor_id: string;

  fund_id: string;

  transaction_type: MfTransactionType;

  amount: number;

  units?: number;

  nav?: number;
}

export interface UpdateFundTransactionDTO {
  status?: OrderStatus;

  units?: number;

  nav?: number;
}

export interface FundTransactionDetails {
  id: string;

  investor_id: string;

  investor_name: string;

  fund_id: string;

  fund_name: string;

  transaction_type: MfTransactionType;

  amount: number;

  units: number;

  nav: number;

  status: OrderStatus;

  transaction_date: Date;
}

export interface InvestorTransactionSummary {
  investor_id: string;

  total_purchase_amount: number;

  total_redeem_amount: number;

  total_transactions: number;

  last_transaction_date?: Date;
}
