import cron from "node-cron";

import * as sipRepository from "../repositories/sip.repository.js";

import * as alertService from "../services/alert.service.js";

/*
|--------------------------------------------------------------------------
| FAILED SIP DETECTOR JOB
|--------------------------------------------------------------------------
|
| Detects failed SIP transactions
| every 30 minutes
|
*/

export const failedSipDetectorJob = cron.schedule("*/30 * * * *", async () => {
  console.log("Running Failed SIP Detector Job...");

  try {
    const failedTransactions = await sipRepository.getFailedSipTransactions();

    for (const transaction of failedTransactions) {
      try {
        await alertService.createFailedSipAlert(
          transaction.investor_id,
          transaction.sip_id,
          transaction.fund_name || "Unknown Fund",
          transaction.failure_reason || "Unknown Failure",
        );

        console.log(`Alert Created For Failed SIP: ${transaction.sip_id}`);
      } catch (error) {
        console.error(
          `Failed To Create Alert For SIP: ${transaction.sip_id}`,
          error,
        );
      }
    }

    console.log(
      `Failed SIP Detector Completed. Found ${failedTransactions.length} failed SIPs`,
    );
  } catch (error) {
    console.error("Failed SIP Detector Job Error:", error);
  }
});

export const startFailedSipDetectorJob = () => {
  failedSipDetectorJob.start();

  console.log("Failed SIP Detector Job Started");
};

export const stopFailedSipDetectorJob = () => {
  failedSipDetectorJob.stop();

  console.log("Failed SIP Detector Job Stopped");
};
