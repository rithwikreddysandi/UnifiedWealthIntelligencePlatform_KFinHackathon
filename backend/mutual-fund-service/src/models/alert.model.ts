import {
  AlertSeverity,
  AlertStatus,
} from "../utils/enums.js";



export interface Alert {

  id: string;

  investor_id?: string;

  alert_type: string;

  severity: AlertSeverity;

  message: string;

  status: AlertStatus;

  created_at?: Date;
}



export interface CreateAlertDTO {

  investor_id?: string;

  alert_type: string;

  severity?: AlertSeverity;

  message: string;
}



export interface UpdateAlertDTO {

  severity?: AlertSeverity;

  message?: string;

  status?: AlertStatus;
}



export interface AlertDetails {

  id: string;

  investor_id?: string;

  investor_name?: string;

  alert_type: string;

  severity: AlertSeverity;

  message: string;

  status: AlertStatus;

  created_at?: Date;
}



export interface AlertSummary {

  total_alerts: number;

  open_alerts: number;

  resolved_alerts: number;

  dismissed_alerts: number;

  critical_alerts: number;

  high_alerts: number;
}



export interface FailedSipAlert {

  investor_id: string;

  investor_name: string;

  sip_id: string;

  fund_name: string;

  amount: number;

  failure_reason: string;

  severity: AlertSeverity;
}



export interface InactiveInvestorAlert {

  investor_id: string;

  investor_name: string;

  last_transaction_date?: Date;

  inactive_days: number;

  severity: AlertSeverity;
}