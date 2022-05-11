import { Router } from 'express';

import NotificationController from '../controllers/NotificationController';

const routes = Router();

const notificationController = new NotificationController();

routes.get('/notifications', notificationController.index);
routes.post('/notifications', notificationController.create);
routes.patch('/notifications', notificationController.update);

export default routes;