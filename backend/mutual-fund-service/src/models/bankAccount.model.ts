import { MandateStatus } from "../utils/enums.js";

export interface BankAccount {
  id: string;

  investor_id: string;

  bank_name: string;

  account_number_masked: string;

  ifsc_code: string;

  mandate_status: MandateStatus;

  created_at?: Date;
}

export interface CreateBankAccountDTO {
  investor_id: string;

  bank_name: string;

  account_number_masked: string;

  ifsc_code: string;
}

export interface UpdateBankAccountDTO {
  bank_name?: string;

  account_number_masked?: string;

  ifsc_code?: string;

  mandate_status?: MandateStatus;
}

export interface BankAccountDetails {
  id: string;

  investor_id: string;

  investor_name: string;

  bank_name: string;

  account_number_masked: string;

  ifsc_code: string;

  mandate_status: MandateStatus;

  created_at?: Date;
}

export interface InvestorBankSummary {
  investor_id: string;

  total_bank_accounts: number;

  approved_mandates: number;

  pending_mandates: number;

  rejected_mandates: number;
}
