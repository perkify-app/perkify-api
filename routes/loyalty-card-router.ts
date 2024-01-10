import { Router } from 'express';
import { getSpecificLoyaltyCard, getAllLoyaltyCards, patchLoyaltyCard, deleteLoyaltyCard, resetPoints } from '../controllers/loyalty-card-controller';


const loyaltyCardRouter = Router();

loyaltyCardRouter
.route('/')
.get(getAllLoyaltyCards);

loyaltyCardRouter
.route('/:loyalty_card_id/redeem')
.get(resetPoints);

loyaltyCardRouter
.route('/:loyalty_card_id')
.get(getSpecificLoyaltyCard)
.patch(patchLoyaltyCard)
.delete(deleteLoyaltyCard);

export default loyaltyCardRouter;