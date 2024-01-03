import { Router } from 'express';
const loyaltyRouter = Router();
import { getSpecificLoyaltyCard, getAllLoyaltyCards, patchLoyaltyCard } from '../controllers/loyalty-controller';

loyaltyRouter
.route('/')
.get(getAllLoyaltyCards);

loyaltyRouter
.route('/:loyalty_card_id')
.get(getSpecificLoyaltyCard)
.patch(patchLoyaltyCard);

export default loyaltyRouter;