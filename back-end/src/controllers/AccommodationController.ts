import { Request, Response } from 'express';

import CreateAccommodationService from '../services/accommodation/CreateAccommodationService';
import ShowAccommodationService from '../services/accommodation/ShowAccommodationService';
import DeleteAccommodationService from '../services/accommodation/DeleteAccommodationService';
import QueryAccommodationService from '../services/accommodation/QueryAccommodationService';
import CityAccommodationService from '../services/accommodation/CityAccommodationService';

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
        const id_user = request.query.id_user as string;
        const title = request.query.title as string;
        const description = request.query.description as string;
        const type = request.query.type as string;
        const state = request.query.state as string;
        const city = request.query.city as string;
        const street = request.query.street as string;
        const number = request.query.number as string;
        const zipcode = request.query.zipcode as string;
        const capacity = request.query.capacity as string;
        const rooms = request.query.rooms as string;
        const bathrooms = request.query.bathrooms as string;
        const price = request.query.price as string;


        const queryAccommodation = new QueryAccommodationService();

        const data = queryAccommodation.execute({
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
            price
        });
        
        return response.status(200).json(data.data);
    };

    public async findByCity(request: Request, response: Response): Promise<Response> {
        const { city } = request.params;

        const cityAccommodations = new CityAccommodationService();

        const data = cityAccommodations.execute(city);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };
};

export default AccommodationController;