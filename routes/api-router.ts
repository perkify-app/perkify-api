import { Router } from 'express';
import loyaltyRouter from './loyalty-router';
import merchantRouter from './merchant-router';
import usersRouter from './users-router';
import redeemRouter from './redeem-router';
import endpointsRouter from './endpoints-router';

const apiRouter = Router();
apiRouter.use('', endpointsRouter);
apiRouter.use('/loyalty_cards', loyaltyRouter);
apiRouter.use('/merchants', merchantRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/redeem', redeemRouter);

export default apiRouter;