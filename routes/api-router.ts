import { Router } from 'express';
import loyaltyRouter from './loyalty-router';
import usersRouter from './users-router';
import redeemRouter from './redeem-router';

const apiRouter = Router();
apiRouter.use('/loyalty_cards', loyaltyRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/redeem', redeemRouter);

export default apiRouter;