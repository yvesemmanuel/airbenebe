import { Request, Response } from 'express';

import CreateRentalService from '../services/rental/CreateRentalService';
import ShowRentalService from '../services/rental/ShowRentalService';
import DeleteRentalService from '../services/rental/DeleteRentalService';
import UpdateRentalService from '../services/rental/UpdateRentalService';
import UserRentalService from '../services/rental/UserRentalService';

class RentalController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id_user, 
                id_accommodation, 
                guests,
                price, 
                nights, 
                purchase_date, 
                start_date, 
                end_date } = request.body;

        const createRental = new CreateRentalService();

        const data = createRental.execute({
            id_user,
            id_accommodation,
            guests,
            price,
            nights,
            purchase_date,
            start_date,
            end_date
        });

        if (data.error) {
            return response.status(409).json({ "message": data.message });
        }

        return response.status(201).json(data.data);
    };

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showRental = new ShowRentalService();

        const data = showRental.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteRental = new DeleteRentalService();

        const data = deleteRental.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(204).json();
    };

    public async updateDates(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { newStart, newEnd } = request.body;

        const updateRental = new UpdateRentalService();

        const data = updateRental.execute({ id, newStart, newEnd });

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };

    public async userRentals(request: Request, response: Response): Promise<Response> {
        const id_user = request.query.id_user as string;
        
        const userRental = new UserRentalService();

        const data = userRental.execute(id_user);

        return response.status(200).json(data.data);
    };
};

export default RentalController;