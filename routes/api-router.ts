import { Router } from 'express';
import loyaltyRouter from './loyalty-router';

const apiRouter = Router();
apiRouter.use('/loyalty_cards', loyaltyRouter);

export default apiRouter;