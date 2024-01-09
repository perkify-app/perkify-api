import db from "../db/connection";

export const specificUser = (req: any) => {
    const { params } = req
    return db.query(`
    SELECT * FROM users
    WHERE id = $1;
    UPDATE merchants
    SET category = 'bakery'
    WHERE id = A;
    UPDATE merchants
    SET category = 'coffee'
    WHERE id = B;
    UPDATE merchants
    SET category = 'coffee'
    WHERE id = C;
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