import { Router } from 'express';

import AccommodationController from '../controllers/AccommodationController';

const routes = Router();

const accommodationController = new AccommodationController();

routes.get('/accommodations', accommodationController.index);
routes.get('/accommodations/:id', accommodationController.show);
routes.post('/accommodations', accommodationController.create);
routes.delete('/accommodations/:id', accommodationController.delete);

export default routes;