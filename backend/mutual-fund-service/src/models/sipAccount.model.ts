import { SipFrequency, SipStatus, OrderStatus } from "../utils/enums.js";

export interface UpdateSipTransactionDTO {
  nav?: number;

  units_allocated?: number;

  debit_date?: Date;

  transaction_status?: OrderStatus;

  failure_reason?: string;
}

export interface SipAccount {
  id: string;

  investor_id: string;

  fund_id: string;

  sip_amount: number;

  frequency: SipFrequency;

  start_date: Date;

  next_installment_date?: Date;

  status: SipStatus;

  created_at?: Date;

  updated_at?: Date;
}

export interface CreateSipAccountDTO {
  investor_id: string;

  fund_id: string;

  sip_amount: number;

  frequency: SipFrequency;

  start_date: Date;
}

export interface UpdateSipAccountDTO {
  sip_amount?: number;

  frequency?: SipFrequency;

  next_installment_date?: Date;

  status?: SipStatus;
}

export interface SipTransaction {
  id: string;

  sip_id: string;

  amount: number;

  nav?: number;

  units_allocated?: number;

  debit_date?: Date;

  transaction_status: OrderStatus;

  failure_reason?: string;

  created_at?: Date;
}

export interface CreateSipTransactionDTO {
  sip_id: string;

  amount: number;

  nav?: number;

  units_allocated?: number;

  debit_date?: Date;

  transaction_status?: OrderStatus;

  failure_reason?: string;
}

export interface SipDetails {
  sip_id: string;

  investor_id: string;

  investor_name: string;

  fund_id: string;

  fund_name: string;

  sip_amount: number;

  frequency: SipFrequency;

  next_installment_date?: Date;

  status: SipStatus;
}

export interface SipSummary {
  investor_id: string;

  total_active_sips: number;

  total_monthly_sip_amount: number;

  failed_sip_count: number;
}
