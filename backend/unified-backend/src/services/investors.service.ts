import { pool } from "../config/db.js";

export const getAllInvestorsService = async () => {
  const query = `
      SELECT
        i.id,
        i.full_name,
        i.email,
        i.phone,
        i.pan_number,
        i.risk_profile,
        i.status,
        i.created_at,

        u.id AS user_id,

        r.role_name

      FROM investors i

      LEFT JOIN users u
      ON i.user_id = u.id

      LEFT JOIN roles r
      ON u.role_id = r.id

      ORDER BY i.created_at DESC
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const getInvestorByIdService = async (investorId: string) => {
  const query = `
      SELECT
        i.*,

        u.last_login_at,

        r.role_name

      FROM investors i

      LEFT JOIN users u
      ON i.user_id = u.id

      LEFT JOIN roles r
      ON u.role_id = r.id

      WHERE i.id = $1
    `;

  const result = await pool.query(query, [investorId]);

  return result.rows[0];
};

export const updateInvestorService = async (investorId: string, data: any) => {
  const query = `
      UPDATE investors
      SET
        full_name =
          COALESCE($1, full_name),

        phone =
          COALESCE($2, phone),

        risk_profile =
          COALESCE($3, risk_profile),

        updated_at = CURRENT_TIMESTAMP

      WHERE id = $4

      RETURNING *
    `;

  const values = [data.full_name, data.phone, data.risk_profile, investorId];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteInvestorService = async (investorId: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const investorResult = await client.query(
      `
          SELECT user_id
          FROM investors
          WHERE id = $1
          `,
      [investorId],
    );

    const investor = investorResult.rows[0];

    if (!investor) {
      throw new Error("Investor not found");
    }

    await client.query(
      `
        DELETE FROM investors
        WHERE id = $1
        `,
      [investorId],
    );

    await client.query(
      `
        DELETE FROM users
        WHERE id = $1
        `,
      [investor.user_id],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};
