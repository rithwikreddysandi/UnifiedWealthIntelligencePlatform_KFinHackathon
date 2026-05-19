import { SipFrequency } from "./enums.js";

export const calculateUnits = (amount: number, nav: number): number => {
  if (nav <= 0) {
    throw new Error("Invalid NAV");
  }

  return Number((amount / nav).toFixed(4));
};

export const calculateCurrentValue = (
  units: number,
  currentNav: number,
): number => {
  return Number((units * currentNav).toFixed(2));
};

export const calculateProfitLoss = (
  investedAmount: number,
  currentValue: number,
): number => {
  return Number((currentValue - investedAmount).toFixed(2));
};

export const calculateReturnPercentage = (
  investedAmount: number,
  currentValue: number,
): number => {
  if (investedAmount === 0) {
    return 0;
  }

  return Number(
    (((currentValue - investedAmount) / investedAmount) * 100).toFixed(2),
  );
};

export const getNextSipDate = (
  currentDate: Date,
  frequency: SipFrequency,
): Date => {
  const nextDate = new Date(currentDate);

  switch (frequency) {
    case SipFrequency.DAILY:
      nextDate.setDate(nextDate.getDate() + 1);
      break;

    case SipFrequency.WEEKLY:
      nextDate.setDate(nextDate.getDate() + 7);
      break;

    case SipFrequency.MONTHLY:
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;

    case SipFrequency.QUARTERLY:
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;

    default:
      throw new Error("Invalid SIP Frequency");
  }

  return nextDate;
};
