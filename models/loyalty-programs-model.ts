import db from '../db/connection'

export const merchantLoyaltyPrograms = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT * FROM loyalty_cards
        WHERE merchant_id = $1
        `, [params.merchant_id])
    .then((data: any) => {
        return data.rows
    })
};