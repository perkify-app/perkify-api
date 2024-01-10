import { Router } from 'express';
const redeemRouter = Router();
import { removeLoyaltyCard, resetPoints } from '../controllers/redeem-controller';

redeemRouter
.route('/:user_id/:loyalty_card_id')
.patch(resetPoints)
.delete(removeLoyaltyCard);

export default redeemRouter;