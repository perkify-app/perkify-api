import db from "../db/connection";

export const specificUser = (req: any) => {
    const { params } = req
    // SELECT * FROM users
    // WHERE id = $1;
    return db.query(`
    UPDATE merchants
    SET category = 'bakery'
    WHERE id = 'A';
    `, [params.user_id])
    .then((data: any) => {
        return data.rows[0]
    })
};
export const deleteSpecificUser = (req: any) => {
    const { params } = req
        return db.query(`
        DELETE FROM users WHERE id = $1;`, [params.user_id])
};