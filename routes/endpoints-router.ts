import { Router } from 'express';
import getEndpointsInfo from '../controllers/api-controller';

const endpointsRouter = Router();


endpointsRouter
.route('/')
.get(getEndpointsInfo);

export default endpointsRouter;