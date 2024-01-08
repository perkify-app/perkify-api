import db from "../db/connection";

export const allLoyaltyCards = (req: any) => {
    let { params } = req
    let { sort_by='points', order='desc', user_id, merchant_id } = req.query
    if (sort_by.toLowerCase() !== 'points' && sort_by.toLowerCase() !== 'created_at') sort_by = 'id'
    if (order.toLowerCase() !== 'desc' && order.toLowerCase() !== 'asc') order = 'desc'
    let queryStr = `SELECT * FROM loyalty_cards`
    queryStr += ` JOIN loyalty_programs ON loyalty_cards.loyalty_program_id = loyalty_programs.id`
    if (user_id) queryStr += ` WHERE loyalty_cards.user_id = '${user_id}'`
    if (merchant_id || params.id) {
        if (merchant_id && user_id) {
            queryStr += ` AND loyalty_programs.merchant_id = '${merchant_id}'`
        }
        if (merchant_id && !user_id) {
            queryStr += ` WHERE loyalty_programs.merchant_id = '${merchant_id}'`
        }
        if (params.id) {
            queryStr += ` WHERE loyalty_programs.merchant_id = '${params.id}'`
        }
    }
    queryStr += ` ORDER BY ${sort_by} ${order}`
    return db.query(queryStr)
    .then((data: any) => {
        return data.rows;
    })
};
export const specificLoyaltyCard = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT *
        FROM loyalty_cards
        JOIN loyalty_programs ON loyalty_cards.loyalty_program_id = loyalty_programs.id
        WHERE loyalty_cards.id = $1
        `, [params.loyalty_card_id])
    .then((data: any) => {
        return data.rows[0]
    })
};
export const giveLoyaltyStamps = (req: any) => {
    const { body, params } = req
    return db.query(`
    UPDATE loyalty_cards
    SET points = points + $1
    WHERE id = $2
    `, [body.inc_points, params.loyalty_card_id])
    .then((data: any) => {
    return data.rows
})
};