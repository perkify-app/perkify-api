import ApiError from "../classes/ApiError";
import db from "../db/connection";
import IUser from "../db/interfaces/User";


export const getAllUsers = async () => {
    const data = await db.query(`SELECT * FROM users`);
    return data.rows;
};

export const getUserById = async (user_id: string) => {
    const data = await db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]);

    if (!data.rowCount) throw new ApiError(404, "User not found");
    return data.rows[0];
};

export const removeUser = async (user_id: string) => {
    await db.query(`DELETE FROM users WHERE id = $1;`, [user_id]);
};

export const updateUser = async (user_id: string, { id: _, ...partialUser }: IUser) => {
    const values: any[] = [];
    const keys = Object.entries(partialUser)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => values.push(value) && `${key} = $${values.length + 1}`);

    const data = await db.query(`UPDATE users SET ${keys} WHERE id = $1 RETURNING *`, [user_id, ...values]);

    if (!data.rowCount) throw new ApiError(404, "User not found");
    return data.rows[0];
};