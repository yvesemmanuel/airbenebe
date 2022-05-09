import { Router } from 'express';

import RentalController from '../controllers/RentalController';

const routes = Router();

const rentalController = new RentalController();

routes.get('/rentals', rentalController.index);
routes.get('/rentals/:id', rentalController.show);
routes.post('/rentals', rentalController.create);
routes.put('/rentals/:id', rentalController.updateDates);
routes.delete('/rentals/:id', rentalController.delete);

export default routes;