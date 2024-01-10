import { Router } from 'express';
import usersRouter from './users-router';
import merchantRouter from './merchant-router';
import endpointsRouter from './endpoints-router';
import loyaltyCardRouter from './loyalty-card-router';
import loyaltyProgramRouter from './loyalty-program-router';

const apiRouter = Router();
apiRouter.use('', endpointsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/merchants', merchantRouter);
apiRouter.use('/loyalty_cards', loyaltyCardRouter);
apiRouter.use('/loyalty_programs', loyaltyProgramRouter);

export default apiRouter;