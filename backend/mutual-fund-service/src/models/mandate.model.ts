import { MandateStatus } from "../utils/enums.js";

export interface Mandate {
  id: string;

  investor_id: string;

  bank_account_id: string;

  mandate_reference: string;

  maximum_amount: number;

  status: MandateStatus;

  expiry_date?: Date;

  created_at?: Date;
}

export interface CreateMandateDTO {
  investor_id: string;

  bank_account_id: string;

  mandate_reference: string;

  maximum_amount: number;

  expiry_date?: Date;
}

export interface UpdateMandateDTO {
  maximum_amount?: number;

  status?: MandateStatus;

  expiry_date?: Date;
}

export interface MandateDetails {
  id: string;

  investor_id: string;

  investor_name: string;

  bank_account_id: string;

  bank_name: string;

  account_number_masked: string;

  mandate_reference: string;

  maximum_amount: number;

  status: MandateStatus;

  expiry_date?: Date;

  created_at?: Date;
}

export interface InvestorMandateSummary {
  investor_id: string;

  total_mandates: number;

  approved_mandates: number;

  pending_mandates: number;

  rejected_mandates: number;

  expired_mandates: number;
}

export interface MandateValidationResult {
  is_valid: boolean;

  status: MandateStatus;

  remaining_limit?: number;

  reason?: string;
}
