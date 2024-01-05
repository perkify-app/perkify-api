import { Router } from 'express';
const loyaltyProgramRouter = Router();
import { getAllMerchantPrograms } from '../controllers/loyalty-programs-controller';

loyaltyProgramRouter
.route('/:id')
.get(getAllMerchantPrograms)
//.post();

export default loyaltyProgramRouter;