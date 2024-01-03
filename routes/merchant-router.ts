import { Router } from 'express';
const merchantRouter = Router();
import { getAllMerchants, getSpecificMerchant, updateMerchant } from '../controllers/merchant-controller';

merchantRouter
.route('/')
.get(getAllMerchants);

merchantRouter
.route('/:merchant_id')
.get(getSpecificMerchant)
.patch(updateMerchant);

export default merchantRouter;