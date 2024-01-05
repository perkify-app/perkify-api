import { Router } from 'express';
const loyaltyCardRouter = Router();
import { getSpecificLoyaltyCard, getAllLoyaltyCards, patchLoyaltyCard } from '../controllers/loyalty-card-controller';

loyaltyCardRouter
.route('/')
.get(getAllLoyaltyCards);

loyaltyCardRouter
.route('/:user_id')
.get(getSpecificLoyaltyCard)
.patch(patchLoyaltyCard);

export default loyaltyCardRouter;