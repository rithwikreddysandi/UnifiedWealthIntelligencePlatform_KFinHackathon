import * as auditRepository from "../repositories/audit.repository.js";

import { SERVER_NAME } from "../utils/constants.js";

export interface AuditLogPayload {
  user_id?: string;

  action: string;

  module?: string;

  entity_id?: string;

  old_value?: any;

  new_value?: any;

  ip_address?: string;
}

export const createAuditLog = async (payload: AuditLogPayload) => {
  return await auditRepository.createAuditLog({
    server_name: SERVER_NAME,
    user_id: payload.user_id,
    action: payload.action,
    module: payload.module,
    entity_id: payload.entity_id,
    old_value: payload.old_value,
    new_value: payload.new_value,
    ip_address: payload.ip_address,
  });
};

export const getAllAuditLogs = async () => {
  return await auditRepository.getAllAuditLogs();
};

export const getAuditLogById = async (id: string) => {
  return await auditRepository.getAuditLogById(id);
};

export const getAuditLogsByUser = async (userId: string) => {
  return await auditRepository.getAuditLogsByUser(userId);
};

export const getAuditLogsByModule = async (module: string) => {
  return await auditRepository.getAuditLogsByModule(module);
};

export const getEntityAuditLogs = async (entityId: string) => {
  return await auditRepository.getEntityAuditLogs(entityId);
};

export const getRecentAuditLogs = async (limit: number = 50) => {
  return await auditRepository.getRecentAuditLogs(limit);
};

export const logFundCreation = async (
  userId: string,
  fundId: string,
  newValue: any,
  ipAddress?: string,
) => {
  return await createAuditLog({
    user_id: userId,
    action: "CREATE_FUND",
    module: "FUND",
    entity_id: fundId,
    new_value: newValue,
    ip_address: ipAddress,
  });
};

export const logSipExecution = async (
  userId: string,
  sipId: string,
  newValue: any,
  ipAddress?: string,
) => {
  return await createAuditLog({
    user_id: userId,
    action: "EXECUTE_SIP",
    module: "SIP",
    entity_id: sipId,
    new_value: newValue,
    ip_address: ipAddress,
  });
};

export const logTransactionCreation = async (
  userId: string,
  transactionId: string,
  newValue: any,
  ipAddress?: string,
) => {
  return await createAuditLog({
    user_id: userId,
    action: "CREATE_TRANSACTION",
    module: "TRANSACTION",
    entity_id: transactionId,
    new_value: newValue,
    ip_address: ipAddress,
  });
};

export const logMandateApproval = async (
  userId: string,
  mandateId: string,
  oldValue: any,
  newValue: any,
  ipAddress?: string,
) => {
  return await createAuditLog({
    user_id: userId,
    action: "APPROVE_MANDATE",
    module: "MANDATE",
    entity_id: mandateId,
    old_value: oldValue,
    new_value: newValue,
    ip_address: ipAddress,
  });
};

export const logSystemAction = async (
  action: string,
  module: string,
  newValue?: any,
) => {
  return await createAuditLog({
    action,
    module,
    new_value: newValue,
  });
};
