import db from "../db/connection";

export const allLoyaltyCards = () => {
    return db.query(`SELECT * FROM loyalty_cards;`)
    .then((data: any) => {
        return data.rows;
    })
};
export const specificLoyaltyCard = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT * FROM loyalty_cards
        WHERE loyalty_card_id = $1
        `, [params.loyalty_card_id])
    .then((data: any) => {
        return data.rows
    })
};
export const giveLoyaltyStamps = (req: any) => {
    const { body, params } = req
    return db.query(`
    UPDATE loyalty_cards
    SET points = points + $1
    WHERE loyalty_card_id = $2
    `, [body.inc_points, params.loyalty_card_id])
    .then((data: any) => {
    return data.rows
})
};