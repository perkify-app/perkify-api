import ApiError from "../classes/ApiError";
import db from "../db/connection";
import ILoyaltyCard from "../db/interfaces/LoyaltyCard";

export interface ILoyaltyCardParams {
    sort_by?: "points" | "id",
    order?: "desc" | "asc",
    user_id?: string
}

export const getAllLoyaltyCards = async ({ sort_by, order, user_id }: ILoyaltyCardParams) => {
    const sortableColumns = ["id", "points"];
    //Default
    sort_by = sort_by && sortableColumns.includes(sort_by) ? sort_by : "points";
    order = order && ["asc", "desc"].includes(order) ? order : "desc";

    const values: any[] = [];
    const whereStatement = `${user_id && values.push(user_id) ? "WHERE lc.user_id = $1" : ""}`;
    
    const data = await db.query(`
        SELECT lc.*, lp.required_points, lp.name, m.company_name
        FROM loyalty_cards lc
        JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id    
        JOIN merchants m ON lp.merchant_id = m.id
        ${whereStatement}
        ORDER BY ${sort_by} ${order}`, values);
    return data.rows;
};

export const getLoyaltyCardById = async (loyalty_card_id: number, user_id?: string) => {
    const values: any[] = [loyalty_card_id];

    const whereStatement = `WHERE lc.id = $1 ${user_id && values.push(user_id) ? `AND lc.user_id = $${values.length}` : ""}`;

    const data = await db.query(`
        SELECT lc.*, lp.required_points, lp.name, m.company_name
        FROM loyalty_cards lc
        JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id
        JOIN merchants m ON lp.merchant_id = m.id        
        ${whereStatement}`, values);

    if (!data.rowCount) throw new ApiError(404, "Loyalty card not found");
    return data.rows[0];
};

export const giveLoyaltyStamps = async (loyalty_card_id: number, inc_points: number) => {
    const data = await db.query(`
    UPDATE loyalty_cards
    SET points = points + $1
    WHERE id = $2
    RETURNING *`, [inc_points, loyalty_card_id]);

    if (!data.rowCount) throw new ApiError(404, "Loyalty card not found");
    return data.rows[0];
};

export const createLoyaltyCard = async ({ loyalty_program_id, user_id }: ILoyaltyCard) => {
    const data = await db.query(`
        INSERT INTO loyalty_cards (loyalty_program_id, user_id)
        VALUES ($1, $2)
        RETURNING *;`, [loyalty_program_id, user_id]);

    return data.rows[0];
};

export const removeLoyaltyCard = async (loyalty_card_id: number) => {
    await db.query(`DELETE FROM loyalty_cards WHERE id = $1;`, [loyalty_card_id]);
};

export const resetPoints = async (loyalty_card_id: number) => {
    const data = await db.query(`
        UPDATE loyalty_cards lc
        SET points = 0
        FROM loyalty_programs lp
        WHERE lc.id = $1
        AND lc.points = lp.required_points
        AND lc.loyalty_program_id = lp.id;`, [loyalty_card_id]);

    if (!data.rowCount) {
        throw new ApiError(422, "Not found or cannot be processed");
    }
};