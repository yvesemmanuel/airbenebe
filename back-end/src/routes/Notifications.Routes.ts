import { Router } from 'express';

import NotificationController from '../controllers/NotificationController';

const routes = Router();

const notificationController = new NotificationController();

routes.get('/notifications', notificationController.index);
routes.post('/notifications', notificationController.create);
// routes.update('/notifications', notificationController.updated);
// routes.delete('/notifications', notificationController.delete);

export default routes;