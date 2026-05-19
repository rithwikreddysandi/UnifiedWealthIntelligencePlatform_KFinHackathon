import { OrderStatus } from "../utils/enums.js";



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



export interface UpdateSipTransactionDTO {

  nav?: number;

  units_allocated?: number;

  debit_date?: Date;

  transaction_status?: OrderStatus;

  failure_reason?: string;
}



export interface SipTransactionDetails {

  id: string;

  sip_id: string;

  investor_id: string;

  investor_name: string;

  fund_id: string;

  fund_name: string;

  amount: number;

  nav: number;

  units_allocated: number;

  debit_date?: Date;

  transaction_status: OrderStatus;

  failure_reason?: string;

  created_at?: Date;
}



export interface FailedSipTransaction {

  id: string;

  sip_id: string;

  investor_id: string;

  fund_name: string;

  amount: number;

  failure_reason: string;

  debit_date?: Date;
}



export interface SipExecutionResult {

  success: boolean;

  sip_transaction_id?: string;

  transaction_status: OrderStatus;

  units_allocated?: number;

  nav?: number;

  failure_reason?: string;
}
