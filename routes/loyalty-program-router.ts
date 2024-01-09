import { Router } from 'express';
const loyaltyProgramRouter = Router();
import { getAllMerchantPrograms } from '../controllers/loyalty-programs-controller';

loyaltyProgramRouter
.route('/:id')
.get(getAllMerchantPrograms);

export default loyaltyProgramRouter;