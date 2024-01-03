const db = require('../db/connection');
export const redeemLoyaltyCard = (req: any) => {
    const { params } = req
        return db.query(`
        DELETE FROM loyalty_cards WHERE (user_id = $1 AND id = $2);`, [params.user_id, params.loyalty_card_id])
};