import { Router } from 'express';
const usersRouter = Router();
import { getUser, deleteUser } from '../controllers/users-controller';
import { getAllLoyaltyCards, newLoyaltyCard } from '../controllers/loyalty-card-controller';

usersRouter
.route('/:user_id')
.get(getUser)
.delete(deleteUser);

usersRouter
.route('/:user_id/loyalty_cards')
.get(getAllLoyaltyCards)

usersRouter
.route('/:user_id/loyalty_cards/:loyalty_program_id')
.post(newLoyaltyCard);

export default usersRouter;