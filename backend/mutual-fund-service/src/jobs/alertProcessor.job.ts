import cron from "node-cron";

import * as alertRepository from "../repositories/alert.repository.js";

import { AlertSeverity, AlertStatus } from "../utils/enums.js";


export const alertProcessorJob = cron.schedule("*/15 * * * *", async () => {
  console.log("Running Alert Processor Job...");

  try {
    const openAlerts = await alertRepository.getOpenAlerts();

    const criticalAlerts = openAlerts.filter(
      (alert: any) => alert.severity === AlertSeverity.CRITICAL,
    );

    for (const alert of criticalAlerts) {
      try {

        console.log(`CRITICAL ALERT ESCALATION: ${alert.message}`);

        await alertRepository.updateAlert(alert.id, {
          status: AlertStatus.IN_PROGRESS,
        });
      } catch (error) {
        console.error(`Failed To Process Alert: ${alert.id}`, error);
      }
    }

    console.log(
      `Alert Processor Completed. Processed ${criticalAlerts.length} Critical Alerts`,
    );
  } catch (error) {
    console.error("Alert Processor Job Error:", error);
  }
});

export const startAlertProcessorJob = () => {
  alertProcessorJob.start();

  console.log("Alert Processor Job Started");
};

export const stopAlertProcessorJob = () => {
  alertProcessorJob.stop();

  console.log("Alert Processor Job Stopped");
};
