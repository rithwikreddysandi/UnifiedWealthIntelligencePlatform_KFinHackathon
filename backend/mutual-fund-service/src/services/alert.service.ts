import * as alertRepository from "../repositories/alert.repository.js";

import { CreateAlertDTO, UpdateAlertDTO } from "../models/alert.model.js";

import { AlertSeverity, AlertStatus } from "../utils/enums.js";

export const createAlert = async (payload: CreateAlertDTO) => {
  const alert = await alertRepository.createAlert(payload);

  return alert;
};

export const getAllAlerts = async () => {
  return await alertRepository.getAllAlerts();
};

export const getAlertById = async (id: string) => {
  return await alertRepository.getAlertById(id);
};

export const getInvestorAlerts = async (investorId: string) => {
  return await alertRepository.getInvestorAlerts(investorId);
};

export const updateAlert = async (id: string, payload: UpdateAlertDTO) => {
  const existingAlert = await alertRepository.getAlertById(id);

  if (!existingAlert) {
    throw new Error("Alert not found");
  }

  return await alertRepository.updateAlert(id, payload);
};

export const deleteAlert = async (id: string) => {
  const existingAlert = await alertRepository.getAlertById(id);

  if (!existingAlert) {
    throw new Error("Alert not found");
  }

  return await alertRepository.deleteAlert(id);
};

export const getOpenAlerts = async () => {
  return await alertRepository.getOpenAlerts();
};

export const getCriticalAlerts = async () => {
  return await alertRepository.getCriticalAlerts();
};

export const resolveAlert = async (id: string) => {
  const existingAlert = await alertRepository.getAlertById(id);

  if (!existingAlert) {
    throw new Error("Alert not found");
  }

  if (existingAlert.status === AlertStatus.RESOLVED) {
    throw new Error("Alert already resolved");
  }

  return await alertRepository.resolveAlert(id);
};

export const dismissAlert = async (id: string) => {
  const existingAlert = await alertRepository.getAlertById(id);

  if (!existingAlert) {
    throw new Error("Alert not found");
  }

  if (existingAlert.status === AlertStatus.DISMISSED) {
    throw new Error("Alert already dismissed");
  }

  return await alertRepository.dismissAlert(id);
};

export const createFailedSipAlert = async (
  investorId: string,
  sipId: string,
  fundName: string,
  reason: string,
) => {
  return await alertRepository.createAlert({
    investor_id: investorId,
    alert_type: "FAILED_SIP",
    severity: AlertSeverity.HIGH,
    message: `SIP execution failed for ${fundName}. Reason: ${reason}`,
  });
};

export const createInactiveInvestorAlert = async (
  investorId: string,
  inactiveDays: number,
) => {
  let severity = AlertSeverity.LOW;

  if (inactiveDays >= 90) {
    severity = AlertSeverity.CRITICAL;
  } else if (inactiveDays >= 60) {
    severity = AlertSeverity.HIGH;
  } else if (inactiveDays >= 30) {
    severity = AlertSeverity.MEDIUM;
  }

  return await alertRepository.createAlert({
    investor_id: investorId,
    alert_type: "INACTIVE_INVESTOR",
    severity,
    message: `Investor inactive for ${inactiveDays} days`,
  });
};

export const createSystemAlert = async (
  message: string,
  severity: AlertSeverity = AlertSeverity.MEDIUM,
) => {
  return await alertRepository.createAlert({
    alert_type: "SYSTEM_ALERT",
    severity,
    message,
  });
};
