import { Router } from 'express';

import UserController from '../controllers/UserController';

const routes = Router();

const userController = new UserController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);
routes.patch('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

routes.post('/login', userController.login);

export default routes;