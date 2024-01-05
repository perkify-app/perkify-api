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
        SELECT *
        FROM loyalty_cards
        JOIN loyalty_programs ON loyalty_cards.loyalty_program_id = loyalty_programs.id
        WHERE user_id = $1
        `, [params.user_id])
    .then((data: any) => {
        return data.rows
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