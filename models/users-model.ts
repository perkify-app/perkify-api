import ApiError from "../classes/ApiError";
import db from "../db/connection";

export const getUserById = async (user_id: string) => {
    const data = await db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]);
    
    if (!data.rowCount) throw new ApiError(404, "User not found");
    return data.rows[0];
};
export const removeUser = async (user_id: string) => {
    await db.query(`DELETE FROM users WHERE id = $1;`, [user_id]);
};