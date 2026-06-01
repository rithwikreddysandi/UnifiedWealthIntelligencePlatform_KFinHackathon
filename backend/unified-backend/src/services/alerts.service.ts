import { pool } from "../config/db.js";

export const createAlertService = async (data: any) => {
  const query = `
      INSERT INTO alerts (
        investor_id,
        alert_type,
        severity,
        message,
        status
      )
      VALUES (
        $1, $2, $3, $4, $5
      )
      RETURNING *
    `;

  const values = [
    data.investor_id,

    data.alert_type,

    data.severity || "MEDIUM",

    data.message,

    "OPEN",
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getAlertsService = async () => {
  const query = `
      SELECT
        a.*,

        i.full_name

      FROM alerts a

      LEFT JOIN investors i
      ON a.investor_id = i.id

      ORDER BY a.created_at DESC
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const resolveAlertService = async (alertId: string) => {
  const query = `
      UPDATE alerts
      SET
        status = 'RESOLVED'
      WHERE id = $1
      RETURNING *
    `;

  const result = await pool.query(query, [alertId]);

  return result.rows[0];
};
