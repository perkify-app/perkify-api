import { Router } from 'express';
const loyaltyProgramRouter = Router();
import { getAllMerchantPrograms } from '../controllers/loyalty-programs-controller';

loyaltyProgramRouter
.route('/:merchant_id')
.get(getAllMerchantPrograms)
//.post();

export default loyaltyProgramRouter;