import { Request, Response} from 'express';

import CreateUserService from '../services/user/CreateUserService';
import ShowUserService from '../services/user/ShowUserService';
import LoginService from '../services/user/LoginService';
import DeleteUserService from '../services/user/DeleteUserService';
import UpdateUserService from '../services/user/UpdateUserService';


class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const data = createUser.execute({
            name,
            email,
            password
        });

        if (data.error) {
            return response.status(409).json({ "message": data.message });
        }

        return response.status(201).json(data.data);
    };

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUser = new ShowUserService();

        const data = showUser.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUser = new DeleteUserService();

        const data = deleteUser.execute(id);

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(204).json();
    };

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { newPassword } = request.body;

        const updateUser = new UpdateUserService();

        const data = updateUser.execute({ id, newPassword });

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };

    public async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const login = new LoginService();

        const data = login.execute({
            email,
            password
        });

        if (data.error) {
            return response.status(404).json({ "message": data.message });
        }

        return response.status(200).json(data.data);
    };
};

export default UserController;