const db = require('../db/connection');

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