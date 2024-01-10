import { Router } from 'express';
const loyaltyProgramRouter = Router();
import { getAllMerchantPrograms, getAllPrograms } from '../controllers/loyalty-programs-controller';

loyaltyProgramRouter
.route('/')
.get(getAllPrograms);

loyaltyProgramRouter
.route('/:id')
.get(getAllMerchantPrograms);

export default loyaltyProgramRouter;