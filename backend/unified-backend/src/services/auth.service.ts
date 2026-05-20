import { pool } from "../config/db.js";

export const findUserByEmail = async (
  email: string
) => {
  const query = `
    SELECT
      u.id,
      u.full_name,
      u.email,
      u.password_hash,
      u.status,
      r.role_name,

      i.id AS investor_id,
      i.phone,
      i.pan_number,
      i.risk_profile

    FROM users u

    LEFT JOIN roles r
    ON u.role_id = r.id

    LEFT JOIN investors i
    ON i.user_id = u.id

    WHERE u.email = $1
    AND u.status = 'ACTIVE'
  `;

  const result = await pool.query(query, [
    email,
  ]);

  return result.rows[0];
};

export const createInvestorAccount =
  async (data: any) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // CREATE USER

      const createUserQuery = `
        INSERT INTO users (
          full_name,
          email,
          password_hash,
          role_id
        )
        VALUES (
          $1,
          $2,
          $3,
          (
            SELECT id
            FROM roles
            WHERE role_name = 'INVESTOR'
          )
        )
        RETURNING *
      `;

      const userValues = [
        data.full_name,
        data.email,
        data.password_hash,
      ];

      const userResult =
        await client.query(
          createUserQuery,
          userValues
        );

      const user = userResult.rows[0];

      // CREATE INVESTOR

      const createInvestorQuery = `
        INSERT INTO investors (
          full_name,
          email,
          phone,
          pan_number,
          dob,
          risk_profile,
          user_id
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7
        )
        RETURNING *
      `;

      const investorValues = [
        data.full_name,
        data.email,
        data.phone,
        data.pan_number,
        data.dob || null,
        data.risk_profile || "MODERATE",
        user.id,
      ];

      const investorResult =
        await client.query(
          createInvestorQuery,
          investorValues
        );

      await client.query("COMMIT");

      return {
        user,
        investor: investorResult.rows[0],
      };
    } catch (error) {
      await client.query("ROLLBACK");

      throw error;
    } finally {
      client.release();
    }
  };

export const updateLastLogin = async (
  userId: string
) => {
  const query = `
    UPDATE users
    SET last_login_at = CURRENT_TIMESTAMP
    WHERE id = $1
  `;

  await pool.query(query, [userId]);
};

export const storeRefreshToken =
  async (
    userId: string,
    refreshToken: string
  ) => {

    await pool.query(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1
      `,
      [userId]
    );

    const query = `
      INSERT INTO refresh_tokens (
        user_id,
        refresh_token,
        expires_at
      )
      VALUES (
        $1,
        $2,
        NOW() + INTERVAL '7 days'
      )
    `;

    await pool.query(query, [
      userId,
      refreshToken,
    ]);
};