import { pool } from "../config/db.js";

export const createPropertyService =
  async (data: any) => {
    const query = `
      INSERT INTO properties (
        investor_id,
        property_name,
        property_type,
        location,
        purchase_price,
        current_valuation,
        rental_income,
        ownership_percentage,
        purchase_date,
        metadata
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10
      )
      RETURNING *
    `;

    const values = [
      data.investor_id,

      data.property_name,

      data.property_type || null,

      data.location,

      data.purchase_price || 0,

      data.current_valuation || 0,

      data.rental_income || 0,

      data.ownership_percentage || 100,

      data.purchase_date || null,

      data.metadata || {},
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];
  };

export const getAllPropertiesService =
  async () => {
    const query = `
      SELECT
        p.*,

        i.full_name AS investor_name

      FROM properties p

      LEFT JOIN investors i
      ON p.investor_id = i.id

      ORDER BY p.created_at DESC
    `;

    const result = await pool.query(query);

    return result.rows;
  };

export const getInvestorPropertiesService =
  async (investorId: string) => {
    const query = `
      SELECT *
      FROM properties
      WHERE investor_id = $1
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [
      investorId,
    ]);

    return result.rows;
  };

export const updatePropertyService =
  async (
    propertyId: string,
    data: any
  ) => {
    const query = `
      UPDATE properties
      SET
        property_name =
          COALESCE($1, property_name),

        current_valuation =
          COALESCE(
            $2,
            current_valuation
          ),

        rental_income =
          COALESCE(
            $3,
            rental_income
          ),

        updated_at =
          CURRENT_TIMESTAMP

      WHERE id = $4

      RETURNING *
    `;

    const values = [
      data.property_name,

      data.current_valuation,

      data.rental_income,

      propertyId,
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];
  };

export const deletePropertyService =
  async (propertyId: string) => {
    const query = `
      DELETE FROM properties
      WHERE id = $1
    `;

    await pool.query(query, [propertyId]);
  };