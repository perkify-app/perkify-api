import { Router } from 'express';
import loyaltyRouter from './loyalty-router';
import usersRouter from './users-router';

const apiRouter = Router();
apiRouter.use('/loyalty_cards', loyaltyRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;