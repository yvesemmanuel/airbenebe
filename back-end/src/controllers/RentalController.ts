import { Request, Response } from 'express';

import CreateRentalService from '../services/rental/CreateRentalService';
import ShowRentalService from '../services/rental/ShowRentalService';
import DeleteRentalService from '../services/rental/DeleteRentalService';
import UpdateRentalService from '../services/rental/UpdateRentalService';
import QueryRentalService from '../services/rental/QueryRentalService';

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

    public async index(request: Request, response: Response): Promise<Response> {
        const id_user = request.query.id_user as string;
        const id_accommodation = request.query.id_accommodation as string;
        const guests = request.query.guests as string;
        const price = request.query.price as string;
        const nights = request.query.nights as string;
        const purchase_date = request.query.purchase_date as string;
        const start_date = request.query.start_date as string;
        const end_date = request.query.end_date as string;

        const queryAccommodation = new QueryRentalService();

        const data = queryAccommodation.execute({
            id_user,
            id_accommodation,
            guests,
            price,
            nights,
            purchase_date,
            start_date,
            end_date
        });
        
        return response.status(200).json(data.data);
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
};

export default RentalController;