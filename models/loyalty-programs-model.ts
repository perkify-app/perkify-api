import db from '../db/connection'

export const merchantLoyaltyPrograms = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT * FROM loyalty_programs
        WHERE merchant_id = $1
        `, [params.id])
    .then((data: any) => {
        return data.rows
    })
};
export const specificMerchantLoyaltyProgram = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT * FROM loyalty_programs
        WHERE merchant_id = $1 AND id = $2
        `, [params.id, params.program_id])
    .then((data: any) => {
        return data.rows
    })
};
export const createLoyaltyPrograms = (req: any) => {
    const { body, params } = req
        return db.query(`
        INSERT INTO loyalty_programs(merchant_id, name, required_points)
        VALUES ($1, $2, $3)
        RETURNING *`, [params.id, body.name, body.required_points])
    .then((data: any) => {
        return data.rows
    })
};
export const deleteMerchantLoyaltyProgram = (req: any) => {
    const { params } = req
        return db.query(`
        DELETE FROM loyalty_programs WHERE (merchant_id = $1 AND id = $2);`, [params.id, params.program_id])
};