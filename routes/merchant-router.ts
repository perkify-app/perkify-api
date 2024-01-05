import { Router } from 'express';
const merchantRouter = Router();
import { getAllMerchants, getSpecificMerchant, updateMerchant } from '../controllers/merchant-controller';
import { getAllLoyaltyCards } from '../controllers/loyalty-card-controller';
import { getAllMerchantPrograms } from '../controllers/loyalty-programs-controller';

merchantRouter
.route('/')
.get(getAllMerchants);

merchantRouter
.route('/:id')
.get(getSpecificMerchant)
.patch(updateMerchant);

merchantRouter
.route('/:id/cards')
.get(getAllLoyaltyCards)

merchantRouter
.route('/:id/programs')
.get(getAllMerchantPrograms)

export default merchantRouter;