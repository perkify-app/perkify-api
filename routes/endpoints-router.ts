import { Router } from 'express';
const endpointsRouter = Router();
import { getEndpointsJson } from '../controllers/endpoints-controller'

endpointsRouter
.route('/')
.get(getEndpointsJson);

export default endpointsRouter;