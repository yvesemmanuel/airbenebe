import { Request, Response } from 'express';

import CreateAccommodationService from '../services/accommodation/CreateAccommodationService';
import ShowAccommodationService from '../services/accommodation/ShowAccommodationService';
import DeleteAccommodationService from '../services/accommodation/DeleteAccommodationService';
import UserAccommodationService from '../services/accommodation/UserAccommodationService';
import ListAccommodationService from '../services/accommodation/ListAccommodationService';

class AccommodationController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id_user,
                title,
                description,
                type,
                state,
                city,
                street,
                number,
                zipcode,
                capacity,
                rooms,
                bathrooms,
                images,
                price } = request.body;

        const createAccommodation = new CreateAccommodationService();

        const data = createAccommodation.execute({
            id_user,
            title,
            description,
            type,
            state,
            city,
            street,
            number,
            zipcode,
            capacity,
            rooms,
            bathrooms,
            images,
            price
        });

        if (data.error) {
            return response.status(409).json({ "message": data.message });
        }

        return response.status(201).json(data.data);
    };

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showAccommodation = new ShowAccommodationService();

        const data = showAccommodation.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteAccommodation = new DeleteAccommodationService();

        const data = deleteAccommodation.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(204).json();
    };

    public async index(request: Request, response: Response): Promise<Response> {
        const listAccommodation = new ListAccommodationService();

        const data = listAccommodation.execute();
        
        return response.status(200).json(data.data);
    };

    public async userAccommodations(request: Request, response: Response): Promise<Response> {
        const id_user = request.query.id_user as string;
        
        const userAccommodation = new UserAccommodationService();

        const data = userAccommodation.execute(id_user);

        return response.status(200).json(data.data);
    };
};

export default AccommodationController;