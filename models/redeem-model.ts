import db from "../db/connection";

export const redeemLoyaltyCard = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT lc.*, lp.required_points, lp.name
        FROM loyalty_cards lc
        JOIN loyalty_programs lp ON lc.loyalty_program_id = lp.id   
        WHERE user_id = $1
        AND loyalty_cards.id = $2
        AND loyalty_cards.points = loyalty_programs.required_points;`, [params.user_id, params.loyalty_card_id])
        .then((data) => {
            if (data.rows.length) {
                return db.query(`
                UPDATE loyalty_cards
                SET points = 0
                WHERE id = $2
                AND user_id = $1`, [params.user_id, params.loyalty_card_id])
            } else {
                throw new Error
            }
        })
};
export const deleteLoyaltyCard = (req: any) => {
    const { params } = req
        return db.query(`
        DELETE FROM loyalty_cards WHERE (user_id = $1 AND id = $2);`, [params.user_id, params.loyalty_card_id])
};