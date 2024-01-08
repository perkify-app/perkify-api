import { Router } from 'express';
const merchantRouter = Router();
import { getAllMerchants, getSpecificMerchant, updateMerchant } from '../controllers/merchant-controller';
import { getAllLoyaltyCards } from '../controllers/loyalty-card-controller';
import { getAllMerchantPrograms, getSpecificMerchantProgram, postLoyaltyProgram } from '../controllers/loyalty-programs-controller';
import { deleteLoyaltyProgram } from '../controllers/loyalty-programs-controller';

merchantRouter
.route('/')
.get(getAllMerchants);

merchantRouter
.route('/:id')
.get(getSpecificMerchant)
.patch(updateMerchant);

merchantRouter
.route('/:id/cards')
.get(getAllLoyaltyCards);

merchantRouter
.route('/:id/programs')
.get(getAllMerchantPrograms)
.post(postLoyaltyProgram);

merchantRouter
.route('/:id/programs/:program_id')
.get(getSpecificMerchantProgram)
.delete(deleteLoyaltyProgram);

export default merchantRouter;