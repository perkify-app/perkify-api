import { Router } from 'express';
import loyaltyRouter from './loyalty-router';
import merchantRouter from './merchant-router';

const apiRouter = Router();
apiRouter.use('/loyalty_cards', loyaltyRouter);
apiRouter.use('/merchants', merchantRouter);

export default apiRouter;