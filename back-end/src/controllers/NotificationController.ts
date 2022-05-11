import { Request, Response } from 'express';

import CreateNotificationService from '../services/notification/CreateNotificationService';
import QueryNotificationService from '../services/notification/QueryNotificationService';
import ShowNotificationService from '../services/notification/ShowNotificationService';


class NotificationController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { user_id, date, show_date, message } = request.body;

        const createNotification = new CreateNotificationService();

        const data = createNotification.execute({
            user_id,
            date,
            show_date,
            message
        });

        if (data.error) {
            return response.status(409).json({ "message": data.message });
        }

        return response.status(201).json(data.data);
    };

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showNotification = new ShowNotificationService();

        const data = showNotification.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };


    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.query.user_id as string;

        const queryNotification = new QueryNotificationService();

        const data = queryNotification.execute({
            user_id,
        });

        return response.status(200).json(data.data);
    };

};

export default NotificationController;