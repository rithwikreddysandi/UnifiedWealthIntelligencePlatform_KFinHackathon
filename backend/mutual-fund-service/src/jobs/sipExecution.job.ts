import cron from "node-cron";

import * as sipRepository from "../repositories/sip.repository.js";

import * as sipService from "../services/sip.service.js";

import * as alertService from "../services/alert.service.js";

import { SipStatus } from "../utils/enums.js";


export const sipExecutionJob = cron.schedule("0 9 * * *", async () => {
  console.log("Running SIP Execution Job...");

  try {
    const allSips = await sipRepository.getAllSips();

    const today = new Date();

    const executableSips = allSips.filter((sip: any) => {
      if (sip.status !== SipStatus.ACTIVE) {
        return false;
      }

      if (!sip.next_installment_date) {
        return false;
      }

      return new Date(sip.next_installment_date) <= today;
    });

    for (const sip of executableSips) {
      try {
        await sipService.executeSip(sip.id);

        console.log(`SIP Executed Successfully: ${sip.id}`);
      } catch (error: any) {
        console.error(`SIP Execution Failed: ${sip.id}`, error.message);

        await alertService.createFailedSipAlert(
          sip.investor_id,
          sip.id,
          sip.fund_name || "Unknown Fund",
          error.message,
        );
      }
    }

    console.log(
      `SIP Execution Completed. Processed ${executableSips.length} SIPs`,
    );
  } catch (error) {
    console.error("SIP Execution Job Error:", error);
  }
});

export const startSipExecutionJob = () => {
  sipExecutionJob.start();

  console.log("SIP Execution Job Started");
};

export const stopSipExecutionJob = () => {
  sipExecutionJob.stop();

  console.log("SIP Execution Job Stopped");
};
