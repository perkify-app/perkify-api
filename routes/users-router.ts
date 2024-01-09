import { Router } from 'express';
const usersRouter = Router();
import { getUser, deleteUser } from '../controllers/users-controller';

usersRouter
.route('/:user_id/change-values')
.get(getUser)
.delete(deleteUser);

export default usersRouter;