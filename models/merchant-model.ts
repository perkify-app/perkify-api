import ApiError from "../classes/ApiError";
import db from "../db/connection";
import IMerchant from "../db/interfaces/Merchant";

export const getAllMerchants = async () => {
    const data = await db.query(`
        SELECT m.*, mc.name category FROM merchants m
        INNER JOIN merchant_categories mc ON mc.id = m.merchant_category_id;
    `);
    return data.rows;
};
export const getMerchantById = async (merchant_id: string) => {
    const data = await db.query(`
        SELECT m.*, mc.name category FROM merchants m
        INNER JOIN merchant_categories mc ON mc.id = m.merchant_category_id   
        WHERE m.id = $1;`, [merchant_id]);

    if (!data.rowCount) throw new ApiError(404, "Merchant not found");
    return data.rows[0];
};

export const updateMerchant = async (merchant_id: string, { id: _, ...partialMerchant }: IMerchant) => {
    const values: any[] = [];
    const keys = Object.entries(partialMerchant)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => values.push(value) && `${key} = $${values.length + 1}`);

    const data = await db.query(`UPDATE merchants SET ${keys} WHERE id = $1 RETURNING *`, [merchant_id, ...values]);
    
    if (!data.rowCount) throw new ApiError(404, "Merchant not found");
    return data.rows[0];
};