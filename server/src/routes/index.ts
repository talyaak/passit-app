import { Router } from 'express';
import usersRouter from './user.routes';
import apiRouter from './api.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/api', apiRouter);

export default routes;
