import { Router } from 'express';
const redeemRouter = Router();
import { deleteCard } from '../controllers/redeem-controller';

redeemRouter
.route('/:user_id/:loyalty_card_id')
.delete(deleteCard);

export default redeemRouter;