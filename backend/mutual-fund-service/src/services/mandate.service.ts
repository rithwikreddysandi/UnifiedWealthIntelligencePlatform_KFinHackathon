import * as mandateRepository
  from "../repositories/mandate.repository.js";

import * as bankAccountRepository
  from "../repositories/bankAccount.repository.js";

import {
  CreateMandateDTO,
  UpdateMandateDTO,
} from "../models/mandate.model.js";

import {
  MandateStatus,
} from "../utils/enums.js";



export const createMandate =
  async (
    payload: CreateMandateDTO
  ) => {

    // validate bank account
    const bankAccount =
      await bankAccountRepository
        .getBankAccountById(
          payload.bank_account_id
        );

    if (!bankAccount) {
      throw new Error(
        "Bank account not found"
      );
    }

    // check duplicate mandate reference
    const existingMandate =
      await mandateRepository
        .getMandateByReference(
          payload.mandate_reference
        );

    if (existingMandate) {
      throw new Error(
        "Mandate reference already exists"
      );
    }

    const mandate =
      await mandateRepository
        .createMandate(
          payload
        );

    return mandate;
  };





export const getAllMandates =
  async () => {

    return await mandateRepository
      .getAllMandates();
  };





export const getMandateById =
  async (id: string) => {

    return await mandateRepository
      .getMandateById(id);
  };





export const getInvestorMandates =
  async (
    investorId: string
  ) => {

    return await mandateRepository
      .getInvestorMandates(
        investorId
      );
  };





export const updateMandate =
  async (
    id: string,
    payload: UpdateMandateDTO
  ) => {

    const existingMandate =
      await mandateRepository
        .getMandateById(id);

    if (!existingMandate) {
      throw new Error(
        "Mandate not found"
      );
    }

    const updatedMandate =
      await mandateRepository
        .updateMandate(
          id,
          payload
        );

    return updatedMandate;
  };





export const deleteMandate =
  async (id: string) => {

    const existingMandate =
      await mandateRepository
        .getMandateById(id);

    if (!existingMandate) {
      throw new Error(
        "Mandate not found"
      );
    }

    return await mandateRepository
      .deleteMandate(id);
  };





export const approveMandate =
  async (id: string) => {

    const existingMandate =
      await mandateRepository
        .getMandateById(id);

    if (!existingMandate) {
      throw new Error(
        "Mandate not found"
      );
    }

    // validate expiry
    if (
      existingMandate.expiry_date &&
      new Date(
        existingMandate.expiry_date
      ) < new Date()
    ) {
      throw new Error(
        "Cannot approve expired mandate"
      );
    }

    return await mandateRepository
      .updateMandate(
        id,
        {
          status:
            MandateStatus.APPROVED,
        }
      );
  };





export const rejectMandate =
  async (id: string) => {

    const existingMandate =
      await mandateRepository
        .getMandateById(id);

    if (!existingMandate) {
      throw new Error(
        "Mandate not found"
      );
    }

    return await mandateRepository
      .updateMandate(
        id,
        {
          status:
            MandateStatus.REJECTED,
        }
      );
  };





export const getApprovedMandates =
  async () => {

    return await mandateRepository
      .getApprovedMandates();
  };





export const getExpiredMandates =
  async () => {

    return await mandateRepository
      .getExpiredMandates();
  };





export const validateMandate =
  async (
    investorId: string,
    amount: number
  ) => {

    const validMandate =
      await mandateRepository
        .validateMandate(
          investorId,
          amount
        );

    if (!validMandate) {
      return {
        is_valid: false,
        reason:
          "No valid approved mandate found",
      };
    }

    return {
      is_valid: true,
      mandate: validMandate,
    };
  };