import db from "../db/connection";

export const specificUser = (req: any) => {
    const { params } = req
    return db.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [params.user_id])
    .then((data: any) => {
        return data.rows
    })
};
export const deleteSpecificUser = (req: any) => {
    const { params } = req
        return db.query(`
        DELETE FROM users WHERE id = $1;`, [params.user_id])
};