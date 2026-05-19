import cron from "node-cron";

import * as fundRepository
  from "../repositories/fund.repository.js";

import * as navService
  from "../services/nav.service.js";



/*
|--------------------------------------------------------------------------
| NAV SYNC JOB
|--------------------------------------------------------------------------
|
| Simulates NAV updates
| every day at 6 PM
|
*/



export const navSyncJob =
  cron.schedule(
    "0 18 * * *",
    async () => {

      console.log(
        "Running NAV Sync Job..."
      );

      try {

        const funds =
          await fundRepository
            .getAllFunds();

        for (const fund of funds) {

          try {

            /*
            |--------------------------------------------------------------------------
            | MOCK NAV UPDATE
            |--------------------------------------------------------------------------
            |
            | Real systems:
            | NAV data comes from
            | AMC / RTA APIs
            |
            */

            const currentNav =
              Number(
                fund.current_nav
              );

            const randomChange =
              Number(
                (
                  Math.random() * 4 - 2
                ).toFixed(2)
              );

            const updatedNav =
              Number(
                (
                  currentNav +
                  randomChange
                ).toFixed(2)
              );



            await navService
              .createNavHistory({

                fund_id:
                  fund.id,

                nav:
                  updatedNav > 1
                    ? updatedNav
                    : 1,

                nav_date:
                  new Date(),
              });

            console.log(
              `NAV Updated For Fund: ${fund.fund_name}`
            );

          } catch (error) {

            console.error(
              `NAV Sync Failed For Fund: ${fund.id}`,
              error
            );
          }
        }

        console.log(
          `NAV Sync Completed For ${funds.length} Funds`
        );

      } catch (error) {

        console.error(
          "NAV Sync Job Error:",
          error
        );
      }
    }
  );





export const startNavSyncJob =
  () => {

    navSyncJob.start();

    console.log(
      "NAV Sync Job Started"
    );
  };





export const stopNavSyncJob =
  () => {

    navSyncJob.stop();

    console.log(
      "NAV Sync Job Stopped"
    );
  };