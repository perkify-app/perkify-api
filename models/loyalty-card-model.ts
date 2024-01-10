import db from "../db/connection";

export const allLoyaltyCards = (req: any) => {
    let { params } = req
    let { sort_by = 'points', order = 'desc', user_id, merchant_id, id } = req.query
    if (params.user_id) user_id = params.user_id
    if (sort_by.toLowerCase() !== 'points' && sort_by.toLowerCase() !== 'created_at') sort_by = 'lc.id'

    if (sort_by === "points") sort_by = "remaining_points";    //TODO - To be changed

    if (order.toLowerCase() !== 'desc' && order.toLowerCase() !== 'asc') order = 'desc'
    let queryStr = `
    SELECT lc.*, lp.required_points, lp.name, m.company_name, (lp.required_points - lc.points) remaining_points
    FROM loyalty_cards lc
    JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id    
    JOIN merchants m ON lp.merchant_id = m.id`
    if (id) queryStr += ` WHERE lc.id = '${id}'`
    if (user_id && !id) queryStr += ` WHERE lc.user_id = '${user_id}'`
    if (user_id && id) queryStr += ` AND lc.user_id = '${user_id}'`
    if (merchant_id || params.id) {
        if (merchant_id && user_id || merchant_id && id) {
            queryStr += ` AND lp.merchant_id = '${merchant_id}'`
        }
        if (merchant_id && !user_id) {
            queryStr += ` WHERE lp.merchant_id = '${merchant_id}'`
        }
        if (params.id) {
            queryStr += ` WHERE lp.merchant_id = '${params.id}'`
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
        SELECT lc.*, lp.required_points, lp.name, m.company_name
        FROM loyalty_cards lc
        JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id
        JOIN merchants m ON lp.merchant_id = m.id
        WHERE lc.id = $1
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

export const createLoyaltyCard = (req: any) => {
    const { user_id } = req.params;
    const { loyalty_program_id } = req.body;
    return db.query(`SELECT * FROM loyalty_cards WHERE loyalty_program_id = $1 AND user_id = $2`, [loyalty_program_id, user_id])
        .then((data: any) => {
            if (!data.rows.length) {
                return db.query(`INSERT INTO loyalty_cards (loyalty_program_id, user_id)
            VALUES ($1, $2)
            RETURNING *`, [loyalty_program_id, user_id])
            }
        })
        .then((data: any) => {
            if (data) {
                return data.rows[0]
            } else {
                throw { status: 400, msg: 'BAD REQUEST: Card Already Exists' }
            }
        })
};

export const removeLoyaltyCard = (req: any) => {
    const { params } = req
    return db.query(`
        DELETE FROM loyalty_cards WHERE id = $1;`, [params.loyalty_card_id])
};

export const redeemLoyaltyCard = (req: any) => {
    const { params } = req
    return db.query(`
        UPDATE loyalty_cards lc
        SET points = 0
        FROM loyalty_programs lp
        WHERE lc.id = $1
        AND lc.points = lp.required_points
        AND lc.loyalty_program_id = lp.id;`, [params.loyalty_card_id])
        .then((data) => {
            if (!data.rowCount) {
                throw new Error
            }
        })
};